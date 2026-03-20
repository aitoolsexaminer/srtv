// ==========================
// Default Channels Layout
// ==========================
const layoutTiles = [
  1, 2, 3, 4, 5, 6,
  7, 8, 'M', 'M', 9, 10,
  11, 12, 'M', 'M', 13, 14,
  15, 16, 17, 18, 19, 20
];

const defaultChannelIds = [
  2,3,4,5,6,7,
  16,17,18,19,
  134,21,22,132,
  8,11,10,14,134,133
];

// ==========================
// Helper: Attach HLS
// ==========================
function attachHls(player, src) {
  if (typeof Hls !== "undefined" && Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(player);
  } else {
    player.src = src;
  }
}

// ==========================
// Helper: Create Player (Updated)
// ==========================
function createPlayer(channel) {
  let player;

  // ======================
  // YouTube
  // ======================
   if (channel.type === "youtube") {
    player = document.createElement("iframe");

    // ✅ For normal video IDs
    if (channel.videoId) {
        player.src = `https://www.youtube.com/embed/${channel.videoId}?autoplay=1&mute=1&playsinline=1&enablejsapi=1`;
    } 
    // ✅ For live channels (must have channelId)
    else if (channel.channelId) {
        player.src = `https://www.youtube.com/embed/live_stream?channel=${channel.channelId}&autoplay=1&mute=1&playsinline=1`;
    }

    player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
}

  // ======================
  // HLS Stream
  // ======================
  else if (channel.type === "hls") {
    player = document.createElement("video");
    setupVideo(player);
    attachHls(player, channel.src);
  }

  // ======================
  // Blob / MP4 / WebM
  // ======================
   else if (channel.type === "blob") {
    player = document.createElement("iframe");
    player.src = channel.src;   // now should be page URL, not blob:
    player.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    player.style.border = "0";
}

  // ======================
  // Generic iframe (for external dashboards/maps)
  // ======================
  else if (channel.type === "iframe" || channel.src.startsWith("http")) {
    player = document.createElement("iframe");
    player.src = channel.src;
    player.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
    player.style.border = "0";
  }

  // ======================
  // Common styles + error handling
  // ======================
   player.style.width = "100%";
  player.style.height = "100%";

  // ✅ For blob, skip fallback. For others, attach fallback if not already attached
  if (!(channel.type === "blob" && channel.src.startsWith("blob:"))) {
    player.addEventListener("error", () => {
      showFallback(player, channel);
    });
  }

  return player;
}

// ==========================
// Setup Video Element
// ==========================
function setupVideo(player) {
  player.autoplay = true;
  player.muted = true;
  player.playsInline = true;
  player.controls = false;
  player.style.objectFit = "cover";
}

// ==========================
// Fallback UI
// ==========================
function showFallback(player, channel) {
  const tile = player.closest(".tile");
  if (!tile) return;

  const inner = tile.querySelector(".tile-inner");

  inner.innerHTML = `
    <div class="fallback">
      <img src="${channel.logo || 'default-logo.png'}" alt="Channel logo" />
      <span>Stream unavailable</span>
    </div>
  `;
}

// ==========================
// Build dashboard tiles
// ==========================
function buildChannels() {
  const dashboard = document.querySelector(".dashboard");
  if (!dashboard) return;

  const numericTiles = layoutTiles.filter(t => t !== 'M');

  numericTiles.forEach((tileNumber, idx) => {
    const channelId = defaultChannelIds[idx];
    const channel = channels.find(c => c.id === channelId);

    if (!channel) {
      console.warn(`Channel ID ${channelId} not found. Tile ${tileNumber} will remain empty.`);
      const emptyTile = document.createElement("div");
      emptyTile.className = "tile empty";
      emptyTile.dataset.number = tileNumber;
      dashboard.appendChild(emptyTile);
      return;
    }

    const tile = createTile(channel, tileNumber);
    dashboard.appendChild(tile);
  });
}

// ==========================
// Create a single tile
// ==========================
function createTile(channel, tileNumber) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.dataset.number = tileNumber;
  tile.dataset.channelId = channel.id;
  tile.dataset.slot = tileNumber;

  const inner = document.createElement("div");
  inner.className = "tile-inner";

  const player = createPlayer(channel);
  inner.appendChild(player);

  const icon = document.createElement("div");
  icon.className = "broadcast-icon";

  tile.appendChild(inner);
  tile.appendChild(icon);

  return tile;
}

// ==========================
// Broadcast icon click
// ==========================
function attachBroadcastEvents() {
  document.addEventListener("click", (e) => {
    const icon = e.target.closest(".broadcast-icon");
    if (!icon) return;

    const tile = icon.closest(".tile");
    if (!tile) return;

    const number = tile.dataset.number;
    console.log("Broadcast clicked:", number);
    activateTile(number);
  });
}

// ==========================
// Load a channel into a tile
// ==========================
function loadChannelIntoTile(slot, channel) {
  const tile = document.querySelector(`.dashboard .tile[data-number="${slot}"]`);
  if (!tile) return;

  const inner = tile.querySelector(".tile-inner");
  inner.innerHTML = "";

  const player = createPlayer(channel);
  inner.appendChild(player);
}

// ==========================
// Channel selection inputs
// ==========================
function attachChannelInputs() {
  document.querySelectorAll(".channel-plus-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slot = btn.dataset.slot;
      const input = document.querySelector(`.channel-search[data-slot="${slot}"]`);
      const channelId = parseInt(input.value);
      const channel = channels.find((c) => c.id === channelId);

      if (!channel) return alert("Channel not found");

      const dashboard = document.querySelector(".dashboard");
      const existingTile = dashboard.querySelector(`.tile[data-slot="${slot}"]`);
      const newTile = createTile(channel, slot);

      if (existingTile) {
        existingTile.replaceWith(newTile);
      } else {
        dashboard.appendChild(newTile);
      }
    });
  });
}





// ==========================
// Initialize dashboard
// ==========================
function initDashboard() {
  buildChannels();
  attachBroadcastEvents();
  attachChannelInputs();
}

document.addEventListener("DOMContentLoaded", initDashboard);