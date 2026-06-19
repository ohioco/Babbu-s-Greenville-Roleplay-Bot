// utils/cooldown.js — rate limiting utility to prevent command spam
// Simple in-memory cooldown manager

class CooldownManager {
  constructor() {
    this.cooldowns = new Map();
  }

  /**
   * Check if user is on cooldown for a command
   * Returns true if user has active cooldown
   */
  hasUser(userId, commandName) {
    const key = `${userId}_${commandName}`;
    return this.cooldowns.has(key);
  }

  /**
   * Set cooldown for user+command
   * Auto-removes after specified seconds
   */
  setUser(userId, commandName, seconds = 3) {
    const key = `${userId}_${commandName}`;
    this.cooldowns.set(key, Date.now());

    // Auto-remove cooldown after timeout
    setTimeout(() => this.cooldowns.delete(key), seconds * 1000);
  }

  /**
   * Get remaining cooldown time in seconds
   * Returns 0 if no cooldown active
   */
  getRemaining(userId, commandName, totalSeconds = 3) {
    const key = `${userId}_${commandName}`;
    const entry = this.cooldowns.get(key);
    if (!entry) return 0;

    const elapsed = (Date.now() - entry) / 1000;
    const remaining = Math.max(0, totalSeconds - elapsed);
    return Math.ceil(remaining);
  }

  /**
   * Force clear a user's cooldown
   * Useful for staff commands
   */
  clear(userId, commandName) {
    const key = `${userId}_${commandName}`;
    return this.cooldowns.delete(key);
  }

  /**
   * Clear all cooldowns for a user
   */
  clearUser(userId) {
    let cleared = 0;
    for (const [key] of this.cooldowns) {
      if (key.startsWith(`${userId}_`)) {
        this.cooldowns.delete(key);
        cleared++;
      }
    }
    return cleared;
  }
}

module.exports = new CooldownManager();
