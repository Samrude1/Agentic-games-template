/**
 * ScreenShake.js
 * High-impact trauma-based camera shake utility.
 *
 * Implements non-linear trauma decay (shake = trauma^2) for visceral, punchy impacts.
 */
import { clamp } from './math.js';

export class ScreenShake {
  /**
   * @param {Object} options
   * @param {number} [options.maxOffset=16] Maximum screen shake displacement in pixels
   * @param {number} [options.maxAngle=0.04] Maximum rotational shake in radians (~2.3 deg)
   * @param {number} [options.decayRate=1.8] Speed of trauma dissipation per second
   */
  constructor({ maxOffset = 16, maxAngle = 0.04, decayRate = 1.8 } = {}) {
    this.maxOffset = maxOffset;
    this.maxAngle = maxAngle;
    this.decayRate = decayRate;

    this.trauma = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.angle = 0;
  }

  /**
   * Adds trauma to the screen shake system.
   * @param {number} amount Trauma value between 0.0 and 1.0
   */
  addTrauma(amount) {
    this.trauma = clamp(this.trauma + amount, 0, 1.0);
  }

  /**
   * Updates trauma decay and calculates pseudo-random offsets for current frame.
   * @param {number} dt Delta time in seconds
   */
  update(dt) {
    if (this.trauma <= 0) {
      this.offsetX = 0;
      this.offsetY = 0;
      this.angle = 0;
      return;
    }

    // Non-linear shake power curve (shake = trauma^2)
    const shake = this.trauma * this.trauma;

    this.offsetX = (Math.random() * 2 - 1) * this.maxOffset * shake;
    this.offsetY = (Math.random() * 2 - 1) * this.maxOffset * shake;
    this.angle = (Math.random() * 2 - 1) * this.maxAngle * shake;

    this.trauma = Math.max(0, this.trauma - this.decayRate * dt);
  }

  /**
   * Applies the shake transform to canvas context before rendering scene.
   * Pair with restore() after rendering.
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} centerX
   * @param {number} centerY
   */
  apply(ctx, centerX = 480, centerY = 270) {
    if (this.trauma <= 0) return;
    ctx.translate(centerX + this.offsetX, centerY + this.offsetY);
    ctx.rotate(this.angle);
    ctx.translate(-centerX, -centerY);
  }
}
