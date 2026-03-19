let currentMainSrc = "";
let mainMuted = false;
let isFullscreen = false;
let interactiveMode = false;
let mainHls = null;

/* ========================= MUTE HELPER ========================= */
function setMute(src, mute) {
    if (!src) return src;
    src = src.replace("mute=0", "").replace("mute=1", "");
    return src.includes("?") ? `${src}&mute=${mute ? 1 : 0}` : `${src}?mute=${mute ? 1 : 0}`;
}

/* ========================= RESET MAIN FEED ========================= */
function resetMainFeed() {
    const mainFrame = document.getElementById("mainFeedFrame");
    const mainVideo = document.getElementById("mainFeedVideo");

    if (mainFrame) {
        mainFrame.src = "";
        mainFrame.style.display = "none";
    }

    if (mainVideo) {
        mainVideo.pause();
        mainVideo.removeAttribute("src");
        mainVideo.load();
        mainVideo.style.display = "none";
    }

    if (mainHls) {
        mainHls.destroy();
        mainHls = null;
    }
}

/* ========================= ACTIVATE TILE ========================= */
function activateTile(number) {
    const mainFrame = document.getElementById("mainFeedFrame");
    const mainVideo = document.getElementById("mainFeedVideo");
    const tile = document.querySelector(`.dashboard .tile[data-number="${number}"]`);
    if (!tile) return;
    const player = tile.querySelector("iframe, video");
    if (!player) return;

    resetMainFeed();

    document.querySelectorAll(".dashboard .tile").forEach(t => t.classList.remove("on-air"));
    tile.classList.add("on-air");

    const mainFeed = document.querySelector(".main-feed");
    if (mainFeed) mainFeed.classList.add("has-broadcast");

    const legend = document.querySelector(".main-feed .legend");
    if (legend) legend.style.display = "none";

    // ================= YOUTUBE =================
    if (player.tagName === "IFRAME") {
        const src = player.getAttribute("src");
        if (!src) return;
        currentMainSrc = src;

        mainFrame.style.display = "block";

        // small timeout ensures previous frame is fully cleared
        mainFrame.src = "";
        setTimeout(() => {
            mainFrame.src = setMute(src, mainMuted) + "&playsinline=1&autoplay=1";
        }, 50);
    }

    // ================= HLS =================
    else if (player.tagName === "VIDEO") {
        const tileId = tile.dataset.channelId;
        const channel = channels.find(c => c.id == tileId);
        if (!channel) return;

        mainVideo.style.display = "block";

        if (typeof Hls !== "undefined" && Hls.isSupported()) {
            mainHls = new Hls();
            mainHls.loadSource(channel.src);
            mainHls.attachMedia(mainVideo);
        } else {
            mainVideo.src = channel.src;
        }

        mainVideo.muted = mainMuted;
        mainVideo.play().catch(() => {});
        currentMainSrc = channel.src;
    }
}

/* ========================= CONTROL FUNCTIONS ========================= */
function toggleFullscreen() {
    const target = document.querySelector(".tile.main-feed") || document.documentElement;
    if (!isFullscreen) {
        if (target.requestFullscreen) target.requestFullscreen();
        else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
        else if (target.msRequestFullscreen) target.msRequestFullscreen();
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        isFullscreen = false;
    }
}

function toggleMute() {
    mainMuted = !mainMuted;
    const muteBtn = document.querySelector('.control-btn[data-control="mute"]');
    muteBtn?.classList.toggle("mute", mainMuted);
    muteBtn?.classList.toggle("unmute", !mainMuted);

    const mainVideo = document.getElementById("mainFeedVideo");
    const mainFrame = document.getElementById("mainFeedFrame");

    if (mainVideo && mainVideo.style.display !== "none") mainVideo.muted = mainMuted;
    if (mainFrame && currentMainSrc) mainFrame.src = setMute(currentMainSrc, mainMuted);
}

function toggleDim() {
    const dimBtn = document.querySelector('.control-btn[data-control="dim"]');
    document.body.classList.toggle("dim-mode");
    dimBtn?.classList.toggle("active");
}

function enableMainOverlay(enable) {
    const overlay = document.getElementById("mainFeedOverlay");
    if (!overlay) return;
    overlay.style.pointerEvents = enable ? "auto" : "none";
}

/* ========================= KEYBOARD SHORTCUTS ========================= */
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
        case "i":
            e.preventDefault();
            interactiveMode = !interactiveMode;
            enableMainOverlay(!interactiveMode);
            console.log("Interactive mode:", interactiveMode ? "ON" : "OFF");
            break;
    }

    // ================= NUMBER KEYS FOR CHANNEL CAST =================
    if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        handleChannelNumberInput(key);
    }
});

/* ========================= CHANNEL NUMBER CASTING ========================= */
let channelBuffer = "";
let channelTimer = null;
const overlay = document.getElementById("channelOverlay");

function handleChannelNumberInput(digit) {
    channelBuffer += digit;
    showChannelOverlay(channelBuffer);

    clearTimeout(channelTimer);
    channelTimer = setTimeout(() => {
        const typedNumber = parseInt(channelBuffer, 10);
        const tile = document.querySelector(`.dashboard .tile[data-number="${typedNumber}"]`);
        if (tile) activateTile(typedNumber);
        hideChannelOverlay();
        channelBuffer = "";
    }, 600);
}

function showChannelOverlay(text) {
    if (!overlay) return;
    overlay.textContent = "CH " + text;
    overlay.classList.add("show");
}

function hideChannelOverlay() {
    if (overlay) overlay.classList.remove("show");
}

/* ========================= DASHBOARD INIT ========================= */
function initDashboard() {
    buildChannels();
    attachBroadcastEvents();

    // Re-attach tile broadcast icons
    document.querySelectorAll(".tile[data-number]").forEach(tile => {
        const icon = tile.querySelector(".broadcast-icon");
        if (!icon) return;
        icon.addEventListener("click", () => {
            const number = tile.dataset.number;
            if (number) activateTile(number);
        });
    });
}

/* ========================= START BUTTON ========================= */
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startOk");
    const startScreen = document.getElementById("startScreen");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            if (startScreen) startScreen.style.display = "none";
            initDashboard();
        });
    }
});