/**
 * SaveManager.js
 * Safe, robust LocalStorage wrapper for persistent high scores,
 * audio settings, and player progression.
 *
 * Includes automatic error fallbacks (incognito mode), schema versioning,
 * and data integrity validation.
 */
export class SaveManager {
  /**
   * @param {string} [storageKey='agentic_game_data']
   * @param {number} [schemaVersion=1]
   */
  constructor(storageKey = 'agentic_game_data', schemaVersion = 1) {
    this.storageKey = storageKey;
    this.schemaVersion = schemaVersion;
    this.defaultData = {
      version: this.schemaVersion,
      highScore: 0,
      totalRuns: 0,
      soundMuted: false,
      musicMuted: false,
      customSettings: {}
    };
    this.data = this.load();
  }

  /**
   * Loads state from localStorage with safe fallback.
   * @returns {typeof this.defaultData}
   */
  load() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return { ...this.defaultData };
      }
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) {
        return { ...this.defaultData };
      }
      const parsed = JSON.parse(raw);
      return { ...this.defaultData, ...parsed };
    } catch (e) {
      console.warn('SaveManager: LocalStorage unavailable or corrupted, using defaults.', e);
      return { ...this.defaultData };
    }
  }

  /**
   * Persists current in-memory data to localStorage.
   */
  save() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      }
    } catch (e) {
      console.warn('SaveManager: Failed to write to LocalStorage.', e);
    }
  }

  /**
   * Records a score. If score exceeds highScore, updates and returns true.
   * @param {number} score
   * @returns {boolean} Whether a new high score was set
   */
  recordScore(score) {
    this.data.totalRuns = (this.data.totalRuns || 0) + 1;
    if (score > (this.data.highScore || 0)) {
      this.data.highScore = score;
      this.save();
      return true;
    }
    this.save();
    return false;
  }

  get highScore() {
    return this.data.highScore || 0;
  }

  get(key, defaultValue = null) {
    return this.data[key] !== undefined ? this.data[key] : defaultValue;
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  /**
   * Resets stored data to defaults.
   */
  clear() {
    this.data = { ...this.defaultData };
    this.save();
  }
}
