/**
 * ObjectPool.js
 * Generic reusable object pool to eliminate Garbage Collection (GC)
 * frame stutter and latency spikes in the game loop.
 */
export class ObjectPool {
  /**
   * @param {() => any} factoryFn Factory function that instantiates a clean object
   * @param {number} [initialSize=50] Number of instances to pre-populate
   */
  constructor(factoryFn, initialSize = 50) {
    if (typeof factoryFn !== 'function') {
      throw new Error('ObjectPool requires a valid factory function.');
    }
    this.factory = factoryFn;
    this.pool = [];
    this.active = new Set();

    // Pre-populate pool
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.factory());
    }
  }

  /**
   * Acquires an idle object from the pool, or instantiates a new one if pool is empty.
   * @returns {any}
   */
  acquire() {
    let obj = this.pool.pop();
    if (!obj) {
      obj = this.factory();
    }
    this.active.add(obj);
    return obj;
  }

  /**
   * Releases an active object back into the idle pool.
   * @param {any} obj
   */
  release(obj) {
    if (!obj) return;
    if (this.active.delete(obj)) {
      this.pool.push(obj);
    }
  }

  /**
   * Releases all active objects back into the pool.
   */
  releaseAll() {
    for (const obj of this.active) {
      this.pool.push(obj);
    }
    this.active.clear();
  }

  /**
   * Purges the entire pool.
   */
  clear() {
    this.pool.length = 0;
    this.active.clear();
  }

  get activeCount() {
    return this.active.size;
  }

  get freeCount() {
    return this.pool.length;
  }
}
