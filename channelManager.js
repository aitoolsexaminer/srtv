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
  20,21,22,132,
  8,9,10,14,15,133
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
// Helper: Create Player
// ==========================
function createPlayer(channel) {
  let player;

  // ======================
  // YouTube
  // ======================
  if (channel.type === "youtube") {
    player = document.createElement("iframe");
    player.src = `https://www.youtube.com/embed/${channel.src}?autoplay=1&mute=1&playsinline=1&enablejsapi=1`;
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
  // Blob / Mixed Source FIXED
  // ======================
  else if (channel.type === "blob") {
    player = document.createElement("video");
    setupVideo(player);

    const src = channel.fetchUrl || channel.src;

    if (!src) {
      showFallback(player, channel);
      return player;
    }

    // ✅ If it's an HLS stream → use HLS.js
    if (src.includes(".m3u8")) {
      attachHls(player, src);
    } else {
      // ✅ Otherwise treat as normal video (mp4, webm, etc.)
      player.src = src;
    }
  }

  // ======================
  // Common styles + errors
  // ======================
  player.style.width = "100%";
  player.style.height = "100%";

  player.addEventListener("error", () => {
    showFallback(player, channel);
  });

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
    activateTile(number);
  });
}