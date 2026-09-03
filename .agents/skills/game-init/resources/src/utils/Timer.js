/**
 * Timer.js
 * Zero-allocation, deterministic timer and tweening helper.
 * Manages cooldowns, repeating delays, and normalized progress.
 */
export class Timer {
  /**
   * @param {number} duration Duration in seconds
   * @param {Object} [options]
   * @param {boolean} [options.loop=false] Automatically repeat when finished
   * @param {boolean} [options.autoStart=true]
   * @param {() => void} [options.onComplete=null]
   */
  constructor(duration, { loop = false, autoStart = true, onComplete = null } = {}) {
    this.duration = duration;
    this.elapsed = 0;
    this.loop = loop;
    this.isRunning = autoStart;
    this.isFinished = false;
    this.onComplete = onComplete;
  }

  /**
   * Advances timer by dt seconds.
   * @param {number} dt
   * @returns {boolean} True if the timer triggered/finished this frame
   */
  update(dt) {
    if (!this.isRunning || this.isFinished) return false;

    this.elapsed += dt;
    if (this.elapsed >= this.duration) {
      if (this.loop) {
        this.elapsed = this.elapsed % this.duration;
      } else {
        this.elapsed = this.duration;
        this.isFinished = true;
        this.isRunning = false;
      }

      if (typeof this.onComplete === 'function') {
        this.onComplete();
      }
      return true;
    }
    return false;
  }

  /**
   * Normalized progress from 0.0 (start) to 1.0 (finished).
   */
  get progress() {
    if (this.duration <= 0) return 1.0;
    return Math.min(1.0, this.elapsed / this.duration);
  }

  reset(newDuration = null) {
    if (newDuration !== null) {
      this.duration = newDuration;
    }
    this.elapsed = 0;
    this.isFinished = false;
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
  }
}
