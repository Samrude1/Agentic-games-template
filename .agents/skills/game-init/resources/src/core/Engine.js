/**
 * Engine.js
 * Vastaa pelisilmukasta, virtuaaliresoluution skaalauksesta ja tilojen/skenejen päivityksestä.
 * Sisältää automaattisen taustalle siirtymisen (visibilitychange) ja suojatun delta-timen.
 */
export class Engine {
  /**
   * @param {Object} config
   * @param {string} config.canvasId
   * @param {number} [config.width=960] Virtuaalileveys
   * @param {number} [config.height=540] Virtuaalikorkeus
   */
  constructor({ canvasId = 'game-canvas', width = 960, height = 540 } = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      throw new Error(`Canvas elementtiä id:llä "${canvasId}" ei löytynyt.`);
    }
    this.ctx = this.canvas.getContext('2d');
    this.virtualWidth = width;
    this.virtualHeight = height;

    this.currentScene = null;
    this.scenes = new Map();

    this.lastTime = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.showFps = false;
    this.fps = 0;
    this.framesThisSecond = 0;
    this.lastFpsUpdate = 0;

    this.initCanvas();
    this.initEventListeners();
    this.resizeCanvas();
  }

  initCanvas() {
    this.canvas.width = this.virtualWidth;
    this.canvas.height = this.virtualHeight;
  }

  initEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());

    // Suojaa peli lagipiikeiltä, kun käyttäjä vaihtaa välilehteä
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });

    window.addEventListener('blur', () => {
      // Valinnainen: peli voidaan asettaa tauolle kun ikkuna menettää fokuksen
    });
  }

  /**
   * Skaalaa canvasin säilyttäen kuvasuhteen ja keskittää sen ruudulle.
   */
  resizeCanvas() {
    const container = this.canvas.parentElement;
    const availWidth = container ? container.clientWidth : window.innerWidth;
    const availHeight = container ? container.clientHeight : window.innerHeight;

    const scale = Math.min(availWidth / this.virtualWidth, availHeight / this.virtualHeight);
    const displayWidth = Math.floor(this.virtualWidth * scale);
    const displayHeight = Math.floor(this.virtualHeight * scale);

    this.canvas.style.width = `${displayWidth}px`;
    this.canvas.style.height = `${displayHeight}px`;

    this.scale = scale;
    this.rect = this.canvas.getBoundingClientRect();
  }

  /**
   * Rekisteröi uusi skene
   */
  addScene(name, scene) {
    scene.engine = this;
    this.scenes.set(name, scene);
  }

  /**
   * Vaihda aktiivista skeneä
   */
  switchScene(name, params = {}) {
    const scene = this.scenes.get(name);
    if (!scene) {
      console.error(`Skeneä "${name}" ei ole rekisteröity.`);
      return;
    }

    if (this.currentScene && typeof this.currentScene.exit === 'function') {
      this.currentScene.exit();
    }

    this.currentScene = scene;
    if (typeof this.currentScene.enter === 'function') {
      this.currentScene.enter(params);
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    requestAnimationFrame((time) => this.loop(time));
  }

  stop() {
    this.isRunning = false;
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    // Nollaa edellinen aika, jottei pitkästä tauosta aiheudu dt-hyppyä
    this.lastTime = performance.now();
  }

  toggleFps() {
    this.showFps = !this.showFps;
    return this.showFps;
  }

  loop(currentTime) {
    if (!this.isRunning) return;

    if (this.isPaused) {
      this.lastTime = currentTime;
      requestAnimationFrame((time) => this.loop(time));
      return;
    }

    // Delta-time sekunneissa, rajoitettu max 0.1s (100ms) lagipiikkien varalta
    let dt = (currentTime - this.lastTime) / 1000;
    dt = Math.min(dt, 0.1);
    this.lastTime = currentTime;

    // FPS-laskenta
    this.framesThisSecond++;
    if (currentTime > this.lastFpsUpdate + 1000) {
      this.fps = this.framesThisSecond;
      this.framesThisSecond = 0;
      this.lastFpsUpdate = currentTime;
    }

    // Päivitä aktiivinen skene
    if (this.currentScene && typeof this.currentScene.update === 'function') {
      this.currentScene.update(dt);
    }

    // Tyhjennä ruutu ja renderöi
    this.ctx.clearRect(0, 0, this.virtualWidth, this.virtualHeight);
    if (this.currentScene && typeof this.currentScene.render === 'function') {
      this.currentScene.render(this.ctx);
    }

    // Valinnainen FPS-näyttö
    if (this.showFps) {
      this.renderFps(this.ctx);
    }

    requestAnimationFrame((time) => this.loop(time));
  }

  renderFps(ctx) {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(5, 5, 80, 24);
    ctx.fillStyle = '#10b981';
    ctx.font = '14px monospace';
    ctx.fillText(`FPS: ${this.fps}`, 10, 22);
    ctx.restore();
  }

  /**
   * Muuntaa ruutukoordinaatit (hiiri/touch) canvasin sisäisiksi virtuaalikoordinaateiksi.
   */
  screenToVirtual(screenX, screenY) {
    const rect = this.canvas.getBoundingClientRect();
    const x = (screenX - rect.left) * (this.virtualWidth / rect.width);
    const y = (screenY - rect.top) * (this.virtualHeight / rect.height);
    return { x, y };
  }
}
