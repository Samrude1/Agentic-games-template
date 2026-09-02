/**
 * State.js
 * Base class for game scenes and object-pooled particle system.
 * Optimized with ObjectPool to eliminate Garbage Collection frame stutter.
 */

import { ObjectPool } from '../utils/ObjectPool.js';

export class Scene {
  constructor() {
    /** @type {import('./Engine.js').Engine} */
    this.engine = null;
  }

  enter(params = {}) {}
  exit() {}
  update(dt) {}
  render(ctx) {}
}

/**
 * High-performance particle emitter for juice and visual impact feedback.
 * Leverages an internal ObjectPool to avoid runtime heap allocations.
 */
export class ParticleEmitter {
  constructor(maxParticles = 200) {
    this.activeParticles = [];
    this.pool = new ObjectPool(() => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 1,
      color: '#38bdf8',
      size: 4
    }), maxParticles);
  }

  emit({ x, y, count = 10, color = '#38bdf8', speed = 120, life = 0.5, size = 4 }) {
    for (let i = 0; i < count; i++) {
      const p = this.pool.acquire();
      const angle = Math.random() * Math.PI * 2;
      const velocity = (Math.random() * 0.7 + 0.3) * speed;

      p.x = x;
      p.y = y;
      p.vx = Math.cos(angle) * velocity;
      p.vy = Math.sin(angle) * velocity;
      p.life = life;
      p.maxLife = life;
      p.color = color;
      p.size = size;

      this.activeParticles.push(p);
    }
  }

  update(dt) {
    for (let i = this.activeParticles.length - 1; i >= 0; i--) {
      const p = this.activeParticles[i];
      p.life -= dt;

      if (p.life <= 0) {
        this.pool.release(p);
        // Fast swap-and-pop removal without shifting array memory
        const last = this.activeParticles.pop();
        if (i < this.activeParticles.length) {
          this.activeParticles[i] = last;
        }
        continue;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }
  }

  render(ctx) {
    for (let i = 0; i < this.activeParticles.length; i++) {
      const p = this.activeParticles[i];
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      ctx.restore();
    }
  }

  /**
   * Returns all active particles back to the pool and resets state.
   */
  clear() {
    for (const p of this.activeParticles) {
      this.pool.release(p);
    }
    this.activeParticles.length = 0;
  }
}
