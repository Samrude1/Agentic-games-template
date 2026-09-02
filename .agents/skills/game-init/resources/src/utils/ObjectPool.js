/**
 * ObjectPool.js
 * Suorituskykyinen geneerinen objektipooli roskienkeruun (Garbage Collection)
 * aiheuttamien lagipiikkien ja nykimisen estämiseksi pelisilmukassa.
 */
export class ObjectPool {
  /**
   * @param {() => any} factoryFn Funktio, joka luo uuden tyhjän objektin
   * @param {number} [initialSize=50] Alustettava vapaiden objektien määrä
   */
  constructor(factoryFn, initialSize = 50) {
    if (typeof factoryFn !== 'function') {
      throw new Error('ObjectPool vaatii parametrina factory-funktion.');
    }
    this.factory = factoryFn;
    this.pool = [];
    this.active = new Set();

    // Esialusta pooli
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.factory());
    }
  }

  /**
   * Varaa ja palauttaa vapaan objektin poolista.
   * Jos pooli on tyhjä, luodaan automaattisesti uusi.
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
   * Palauttaa käytössä olleen objektin takaisin vapaiden pooliin.
   * @param {any} obj
   */
  release(obj) {
    if (!obj) return;
    if (this.active.delete(obj)) {
      this.pool.push(obj);
    }
  }

  /**
   * Palauttaa kaikki aktiiviset objektit takaisin pooliin.
   */
  releaseAll() {
    for (const obj of this.active) {
      this.pool.push(obj);
    }
    this.active.clear();
  }

  /**
   * Tyhjentää koko poolin.
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
