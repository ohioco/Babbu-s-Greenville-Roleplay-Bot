// sessionStore.js — with TTL-based cleanup to prevent memory leaks
// Stores session links with automatic expiration

const store = {};
let counter = 0;

const LINK_TTL = 24 * 60 * 60 * 1000; // 24 hours
const CLEANUP_INTERVAL = 60 * 60 * 1000; // Clean up every hour

/**
 * Save a link and return a short key
 * Avoids Discord's 100-character customId limit
 */
function saveLink(link) {
  const key = `lnk_${++counter}`;
  store[key] = {
    link,
    createdAt: Date.now(),
  };
  return key;
}

/**
 * Retrieve a link by key
 * Automatically expires links after TTL
 */
function getLink(key) {
  const entry = store[key];
  if (!entry) return null;

  // Check if link has expired
  if (Date.now() - entry.createdAt > LINK_TTL) {
    delete store[key];
    return null;
  }

  return entry.link;
}

/**
 * Clean up expired links
 * Runs automatically on interval
 */
function cleanupExpiredLinks() {
  const now = Date.now();
  let cleaned = 0;

  for (const [key, entry] of Object.entries(store)) {
    if (now - entry.createdAt > LINK_TTL) {
      delete store[key];
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`[sessionStore] Cleaned up ${cleaned} expired links`);
  }
}

/**
 * Start automatic cleanup interval
 * Runs every hour
 */
function startCleanupInterval() {
  const interval = setInterval(cleanupExpiredLinks, CLEANUP_INTERVAL);

  // Allow process to exit even with this interval running
  interval.unref();

  console.log("[sessionStore] Cleanup interval started (1 hour)");
  return interval;
}

// Start cleanup on module load
startCleanupInterval();

module.exports = { saveLink, getLink, cleanupExpiredLinks };
