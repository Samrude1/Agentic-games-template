/**
 * Camera.js
 * 2D smooth tracking camera with lerp following, bounds clamping,
 * and coordinate transformations.
 */
import { lerp, clamp } from './math.js';

export class Camera {
  /**
   * @param {number} viewportWidth Virtual width of canvas (e.g. 960)
   * @param {number} viewportHeight Virtual height of canvas (e.g. 540)
   */
  constructor(viewportWidth = 960, viewportHeight = 540) {
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;

    this.x = 0;
    this.y = 0;
    this.target = null;
    this.smoothSpeed = 5.0; // Lerp factor per second

    this.bounds = null; // Optional: { minX, minY, maxX, maxY }
  }

  /**
   * Assigns an entity to track. Entity must have .x and .y properties.
   * @param {{ x: number, y: number }} entity
   */
  follow(entity) {
    this.target = entity;
  }

  /**
   * Sets world bounds to clamp the camera inside.
   */
  setBounds(minX, minY, maxX, maxY) {
    this.bounds = { minX, minY, maxX, maxY };
  }

  update(dt) {
    if (!this.target) return;

    // Desired camera top-left position centering target in viewport
    const desiredX = this.target.x - this.viewportWidth / 2;
    const desiredY = this.target.y - this.viewportHeight / 2;

    const t = clamp(this.smoothSpeed * dt, 0, 1);
    this.x = lerp(this.x, desiredX, t);
    this.y = lerp(this.y, desiredY, t);

    // Clamp inside world boundaries if set
    if (this.bounds) {
      this.x = clamp(this.x, this.bounds.minX, this.bounds.maxX - this.viewportWidth);
      this.y = clamp(this.y, this.bounds.minY, this.bounds.maxY - this.viewportHeight);
    }
  }

  /**
   * Applies camera scroll translation to canvas context.
   * Call ctx.save() before and ctx.restore() after.
   * @param {CanvasRenderingContext2D} ctx
   */
  apply(ctx) {
    ctx.translate(-Math.floor(this.x), -Math.floor(this.y));
  }

  /**
   * Converts virtual screen coordinates to in-game world coordinates.
   */
  screenToWorld(screenX, screenY) {
    return {
      x: screenX + this.x,
      y: screenY + this.y
    };
  }

  /**
   * Converts world coordinates to virtual screen coordinates.
   */
  worldToScreen(worldX, worldY) {
    return {
      x: worldX - this.x,
      y: worldY - this.y
    };
  }
}
