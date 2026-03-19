let currentMainSrc = "";
let mainMuted = false;
let isFullscreen = false;

/* ✅ ADDED */
let interactiveMode = false;

// -----------------------------
let ytPlayer = null;  // <- add here, global scope
// -----------------------------

/* ========================= MUTE HELPER ========================= */
function setMute(src, mute) {
    if (!src) return src;
    src = src.replace("mute=0", "").replace("mute=1", "");
    return src.includes("?") ? `${src}&mute=${mute ? 1 : 0}` : `${src}?mute=${mute ? 1 : 0}`;
}

/* ========================= OVERLAY CONTROL ========================= */
/* ✅ ADDED */
function enableMainOverlay(enable) {
    const overlay = document.getElementById("mainFeedOverlay");
    if (!overlay) return;
    overlay.style.pointerEvents = enable ? "auto" : "none";
}

/* ========================= ACTIVATE TILE ========================= */

function activateTile(number) {
    const mainFrame = document.getElementById("mainFeedFrame");
    const mainVideo = document.getElementById("mainFeedVideo");
    const tile = document.querySelector(`.dashboard .tile[data-number="${number}"]`);
    if (!tile) return;

    const player = tile.querySelector("iframe, video");
    if (!player) return;

    // Enable overlay control
    enableMainOverlay(true);
    interactiveMode = false;

    // Highlight the active tile
    document.querySelectorAll(".dashboard .tile").forEach(t => t.classList.remove("on-air"));
    tile.classList.add("on-air");

    const mainFeed = document.querySelector(".main-feed");
    if (mainFeed) mainFeed.classList.add("has-broadcast");

    // Hide the legend
    const legend = document.querySelector(".main-feed .legend");
    if (legend) legend.style.display = "none";

    // ====================== YOUTUBE IFRAME ======================
    if (player.tagName === "IFRAME" && player.src.includes("youtube.com/embed")) {
        const src = player.getAttribute("src");
        if (!src) return;

        // Stop main video
        if (mainVideo) {
            mainVideo.pause();
            mainVideo.src = "";
            mainVideo.style.display = "none";
        }

        // Show iframe
        mainFrame.style.display = "block";

        // Destroy previous YouTube player if exists
        if (ytPlayer) {
            ytPlayer.destroy();
            ytPlayer = null;
        }

        // Extract YouTube ID from src
        const videoIdMatch = src.match(/embed\/([a-zA-Z0-9_-]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (!videoId) return console.warn("Invalid YouTube video ID");

        ytPlayer = new YT.Player('mainFeedFrame', {
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                playsinline: 1,
                mute: mainMuted ? 1 : 0
            },
            events: {
                'onReady': function(event) {
                    event.target.playVideo();
                    if (!mainMuted) event.target.unMute();
                }
            }
        });

        currentMainSrc = src;
    }

    // ====================== VIDEO PLAYER (HLS, MP4, WebM, Blob) ======================
    else if (player.tagName === "VIDEO") {
        const tile = player.closest(".tile");
        const channelId = tile?.dataset.channelId;
        const channel = channels.find(c => c.id == channelId);
        if (!channel) return;

        // Hide iframe
        if (mainFrame) {
            mainFrame.style.display = "none";
            mainFrame.innerHTML = ""; // clear old iframe
        }

        // Show main video
        mainVideo.style.display = "block";

        // Destroy previous HLS if any
        if (window.mainHls) {
            window.mainHls.destroy();
            window.mainHls = null;
        }

        // ====================== Handle Different Video Types ======================
        // HLS stream
        if (channel.type === "hls" || (channel.src && channel.src.includes(".m3u8"))) {
            if (typeof Hls !== "undefined" && Hls.isSupported()) {
                window.mainHls = new Hls();
                window.mainHls.loadSource(channel.src);
                window.mainHls.attachMedia(mainVideo);
            } else {
                mainVideo.src = channel.src;
            }
        }
        // Blob / MP4 / WebM
        else if (channel.type === "blob" || /\.(mp4|webm)$/i.test(channel.src)) {
            mainVideo.src = channel.src;
        }
        // Generic iframe embedded as video (rare)
        else {
            console.warn("Unknown video type for main tile:", channel);
            mainVideo.src = channel.src || "";
        }

        mainVideo.muted = mainMuted;
        mainVideo.autoplay = true;
        mainVideo.playsInline = true;
        mainVideo.controls = false;

        mainVideo.play().catch(() => {});

        currentMainSrc = channel.src;
    }

    // ====================== GENERIC IFRAME ======================
    else if (player.tagName === "IFRAME") {
        const src = player.src;
        if (!src) return;

        // Stop main video
        if (mainVideo) {
            mainVideo.pause();
            mainVideo.src = "";
            mainVideo.style.display = "none";
        }

        // Show iframe
        mainFrame.style.display = "block";
        mainFrame.src = src;

        currentMainSrc = src;
    }
}

/* ========================= CONTROL FUNCTIONS ========================= */
function toggleFullscreen() {
    const target = document.querySelector(".tile.main-feed") || document.documentElement;
    const fullscreenBtn = document.querySelector('.control-btn[data-control="fullscreen"]');
    
    if (!isFullscreen) {
        if (target.requestFullscreen) target.requestFullscreen();
        else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
        else if (target.msRequestFullscreen) target.msRequestFullscreen();
        isFullscreen = true;
        fullscreenBtn?.classList.add("active");
        document.body.classList.add("fullscreen-active");
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        isFullscreen = false;
        fullscreenBtn?.classList.remove("active");
        document.body.classList.remove("fullscreen-active");
    }
}

function toggleMute() {
    const mainFrame = document.getElementById("mainFeedFrame");
    const mainVideo = document.getElementById("mainFeedVideo");
    const muteBtn = document.querySelector('.control-btn[data-control="mute"]');
    
    mainMuted = !mainMuted;
    muteBtn?.classList.toggle("mute", mainMuted);
    muteBtn?.classList.toggle("unmute", !mainMuted);
    
    if (mainVideo?.style.display !== "none") {
        mainVideo.muted = mainMuted;
    }
    if (mainFrame && currentMainSrc) {
        mainFrame.src = setMute(currentMainSrc, mainMuted);
    }
}

function toggleDim() {
    const dimBtn = document.querySelector('.control-btn[data-control="dim"]');
    document.body.classList.toggle("dim-mode");
    dimBtn?.classList.toggle("active");
}

/* ========================= ATTACH CONTROL BUTTONS IMMEDIATELY ========================= */
function attachControlButtons() {
    document.addEventListener('click', (e) => {
        const fullscreenBtn = e.target.closest('.control-btn[data-control="fullscreen"]');
        const muteBtn = e.target.closest('.control-btn[data-control="mute"]');
        const dimBtn = e.target.closest('.control-btn[data-control="dim"]');
        
        if (fullscreenBtn) {
            e.preventDefault();
            toggleFullscreen();
        }
        if (muteBtn) {
            e.preventDefault();
            toggleMute();
        }
        if (dimBtn) {
            e.preventDefault();
            toggleDim();
        }
    });
}

/* ========================= SINGLE KEYBOARD HANDLER ========================= */
document.addEventListener("keydown", (e) => {
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;
    
    const key = e.key.toLowerCase();
    switch(key) {
        case "f":
            e.preventDefault();
            toggleFullscreen();
            break;
        case "m":
            e.preventDefault();
            toggleMute();
            break;
        case "d":
            e.preventDefault();
            toggleDim();
            break;
        case "s":
            e.preventDefault();
            const settingsModal = document.getElementById("Modal");
            if (settingsModal) {
                settingsModal.style.display = settingsModal.style.display === "block" ? "none" : "block";
            }
            break;

        /* ✅ ADDED */
        case "i":
            e.preventDefault();
            interactiveMode = !interactiveMode;
            enableMainOverlay(!interactiveMode);
            console.log("Interactive mode:", interactiveMode ? "ON" : "OFF");
            break;
    }
});

/* ========================= DOM READY ========================= */
document.addEventListener("DOMContentLoaded", () => {
    
    attachControlButtons();
    
    const startBtn = document.getElementById("startOk");
    const startScreen = document.getElementById("startScreen");

    function startDashboard() {
        if (startScreen) startScreen.style.display = "none";
        const el = document.documentElement;
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.msRequestFullscreen) el.msRequestFullscreen();
        setTimeout(initDashboard, 100);
    }

    if (startBtn) {
        startBtn.addEventListener("click", startDashboard);
    }

    /* ========================= ABOUT ========================= */
    const aboutLink = document.getElementById("about-link");
    const aboutClose = document.getElementById("about-close");
    const startContent = document.querySelector(".start-content");

    if (aboutLink && aboutClose && startContent) {
        aboutLink.addEventListener("click", (e) => {
            e.preventDefault();
            startContent.classList.add("show-about");
        });
        aboutClose.addEventListener("click", () => {
            startContent.classList.remove("show-about");
        });
    }

    /* ========================= CITY SEARCH ========================= */
    document.querySelectorAll(".city-search").forEach(input => {
        const results = input.closest(".settings-option-row")?.querySelector(".city-results");
        if (!results) return;

        input.addEventListener("input", () => {
            const value = input.value.toLowerCase();
            results.innerHTML = "";
            if (!value) return;

            const matches = cities.filter(c => c.name.toLowerCase().includes(value)).slice(0, 8);
            matches.forEach(city => {
                const div = document.createElement("div");
                div.textContent = city.name;
                div.addEventListener("click", () => {
                    input.value = city.name;
                    results.innerHTML = "";
                    const slot = parseInt(input.dataset.slot);
                    const zoneId = zoneSlots[slot];
                    zones[zoneId] = city.tz;
                    const label = document.querySelector(`.clock-option-clock[data-clock-label="${zoneId}"]`);
                    if (label) label.textContent = city.label;
                    updateWorldClock();
                });
                results.appendChild(div);
            });
        });
    });

    /* ========================= CHANNEL PICKER INIT ========================= */

    populateChannelPicker();

    const channelSections = document.querySelectorAll(".chan");
    channelSections.forEach(section => {
        section.addEventListener("toggle", () => {
            if (section.open) {
                channelSections.forEach(other => {
                    if (other !== section) other.open = false;
                });
            }
        });
    });
});

/* ========================= DASHBOARD RESIZE ========================= */
function resizeDashboard() {
    const dashboard = document.querySelector(".dashboard");
    if (!dashboard) return;

    const baseWidth = 1920;
    const baseHeight = 780;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scale = Math.min(screenWidth / baseWidth, screenHeight / baseHeight);
    dashboard.style.transform = `scale(${scale})`;
}

/* ========================= DASHBOARD INIT ========================= */
function initDashboard() {
    if (!document.querySelector(".dashboard .tile")) {
        setTimeout(initDashboard, 200);
        return;
    }

    buildChannels();
    attachBroadcastEvents();

    const mainFrame = document.getElementById("mainFeedFrame");
    window.addEventListener("resize", resizeDashboard);
    window.addEventListener("load", resizeDashboard);
    resizeDashboard();

    /* ========================= TILE BROADCAST ICONS ========================= */
    document.querySelectorAll(".tile[data-number]").forEach(tile => {
        const icon = tile.querySelector(".broadcast-icon");
        if (!icon) return;
        icon.addEventListener("click", () => {
            const number = tile.dataset.number;
            if (number) activateTile(number);
        });
    });

    /* ========================= MUTE ALL TILES ========================= */
    document.querySelectorAll(".tile iframe").forEach(frame => {
        if (frame === mainFrame) return;
        frame.src = setMute(frame.getAttribute("src"), true);
    });

    /* ========================= AUTO REFRESH STREAMS ========================= */
    setInterval(() => {
        document.querySelectorAll(".tile iframe").forEach(frame => {
            if (!frame.src) return;
            frame.src = frame.src;
        });
    }, 300000);
}

/* ========================= CHANNEL FUNCTIONS ========================= */
function populateChannelPicker() {
    const containers = {
        arabic: document.querySelector("#topic-arabic .chan-list"),
        lebanese: document.querySelector("#topic-lebanese .chan-list"),
        gulfarabregion: document.querySelector("#topic-gulfarabregion .chan-list"),
        intnews: document.querySelector("#topic-intnews .chan-list"),
        businessfinance: document.querySelector("#topic-businessfinance .chan-list"),
        sciencespace: document.querySelector("#topic-sciencespace .chan-list"),
        doclifestyle: document.querySelector("#topic-doclifestyle .chan-list"),
        sports: document.querySelector("#topic-sports .chan-list"),
        ent: document.querySelector("#topic-ent .chan-list")
    };

    channels.forEach(channel => {
        const item = document.createElement("div");
        item.className = "channel-option";
        item.textContent = channel.name;
        item.addEventListener("click", () => {
            assignChannelToSlot(channel);
        });
        const target = containers[channel.group];
        if (target) target.appendChild(item);
    });
}

let activeChannelInput = null;
const channelModal = document.getElementById("channelModal");

function assignChannelToSlot(channel) {
    if (!activeChannelInput) return;
    activeChannelInput.value = channel.name;
    const slot = activeChannelInput.dataset.slot;
    loadChannelIntoTile(slot, channel);
    if (channelModal) channelModal.style.display = "none";
}

function loadChannelIntoTile(slot, channel) {
    const tiles = document.querySelectorAll(".dashboard .tile");
    const tile = tiles[slot];
    if (!tile) return;

    const inner = tile.querySelector(".tile-inner");
    inner.innerHTML = "";

    let player;
    if (channel.type === "youtube") {
        player = document.createElement("iframe");
        player.src = `https://www.youtube.com/embed/${channel.src}?autoplay=1&mute=1&playsinline=1&enablejsapi=1`;
        player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    } else if (channel.type === "hls") {
        player = document.createElement("video");
        player.autoplay = true;
        player.muted = true;
        player.controls = false;
        if (typeof Hls !== 'undefined' && Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(channel.src);
            hls.attachMedia(player);
        } else {
            player.src = channel.src;
        }
    }

    inner.appendChild(player);
}

function attachBroadcastEvents() {
    document.addEventListener("click", (e) => {
        const icon = e.target.closest(".broadcast-icon");
        if (!icon) return;
        const tile = icon.closest(".tile");
        if (!tile) return;
        const number = tile.dataset.number;
        if (number) activateTile(number);
    });
}

/* ========================= CHANNEL OVERLAY ========================= */
let channelBuffer = "";
let channelTimer = null;
const overlay = document.getElementById("channelOverlay");

function showChannelOverlay(text) {
    if (!overlay) return;
    overlay.textContent = "CH " + text;
    overlay.classList.add("show");
}

function hideChannelOverlay() {
    if (overlay) overlay.classList.remove("show");
}

document.addEventListener("keydown", (e) => {
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;
    if (!/^[0-9]$/.test(e.key)) return;

    channelBuffer += e.key;
    showChannelOverlay(channelBuffer);

    clearTimeout(channelTimer);
    channelTimer = setTimeout(() => {
        const typedNumber = parseInt(channelBuffer, 10);
        const tile = document.querySelector(`.dashboard .tile[data-number="${typedNumber}"]`);
        if (tile) activateTile(typedNumber);
        hideChannelOverlay();
        channelBuffer = "";
    }, 600);
});