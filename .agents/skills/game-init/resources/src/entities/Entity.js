/**
 * Entity.js
 * Universal base class for pooled, high-performance game entities
 * (Player, Enemies, Projectiles, Collectibles).
 *
 * Designed for zero-allocation recycling with ObjectPool.js.
 */
export class Entity {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 16;
    this.width = 32;
    this.height = 32;
    this.color = '#38bdf8';

    this.active = true;
    this.isDead = false;
    this.health = 100;
    this.maxHealth = 100;

    this.layer = 0;
  }

  /**
   * Resets entity state for pool recycling.
   * @param {number} x
   * @param {number} y
   */
  init(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.active = true;
    this.isDead = false;
    this.health = this.maxHealth;
    return this;
  }

  /**
   * Updates entity state by delta-time (in seconds).
   * @param {number} dt
   */
  update(dt) {
    if (!this.active) return;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  /**
   * Renders the entity onto canvas context.
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /**
   * Inflicts damage onto entity and flags for destruction if health reaches 0.
   * @param {number} amount
   */
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      this.destroy();
    }
  }

  /**
   * Flags entity as dead and ready for pool release.
   */
  destroy() {
    this.active = false;
    this.isDead = true;
  }
}
