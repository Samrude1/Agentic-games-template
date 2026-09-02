import { Scene, ParticleEmitter } from '../core/State.js';
import { circleVsCircle } from '../utils/Collision.js';

/**
 * GameScene
 * Esimerkkipeliskenen toteutus, joka demonstroi pelaajan liikettä, fysiikkaa,
 * partikkeleita, ääniä, törmäyksiä ja kosketusnäyttö-/näppäimistöohjausta.
 */
export class GameScene extends Scene {
  /**
   * @param {import('../core/Input.js').Input} input
   * @param {import('../core/Audio.js').SoundManager} audio
   */
  constructor(input, audio) {
    super();
    this.input = input;
    this.audio = audio;
    this.particles = new ParticleEmitter(150);

    // Luetaan väripaletti dynaamisesti CSS:n :root -muuttujista (Style Guide)
    const rootStyle = getComputedStyle(document.documentElement);
    this.colors = {
      primary: rootStyle.getPropertyValue('--primary').trim() || '#38bdf8',
      accent: rootStyle.getPropertyValue('--accent').trim() || '#f43f5e',
      text: rootStyle.getPropertyValue('--text-color').trim() || '#f8fafc'
    };

    this.player = {
      x: 480,
      y: 270,
      radius: 18,
      speed: 240,
      color: this.colors.primary
    };

    this.targets = [];
    this.score = 0;
    this.spawnTimer = 0;
  }

  enter() {
    this.score = 0;
    this.player.x = this.engine.virtualWidth / 2;
    this.player.y = this.engine.virtualHeight / 2;
    this.targets = [];
    this.spawnTarget();
  }

  spawnTarget() {
    const margin = 50;
    this.targets.push({
      x: margin + Math.random() * (this.engine.virtualWidth - margin * 2),
      y: margin + Math.random() * (this.engine.virtualHeight - margin * 2),
      radius: 14,
      color: this.colors.accent,
      pulse: 0
    });
  }

  update(dt) {
    // 1. Pelaajan liike
    let moveX = 0;
    let moveY = 0;

    if (this.input.isKeyDown('ArrowLeft') || this.input.isKeyDown('KeyA')) moveX -= 1;
    if (this.input.isKeyDown('ArrowRight') || this.input.isKeyDown('KeyD')) moveX += 1;
    if (this.input.isKeyDown('ArrowUp') || this.input.isKeyDown('KeyW')) moveY -= 1;
    if (this.input.isKeyDown('ArrowDown') || this.input.isKeyDown('KeyS')) moveY += 1;

    // Normalisoi viistoliike
    if (moveX !== 0 && moveY !== 0) {
      moveX *= Math.SQRT1_2;
      moveY *= Math.SQRT1_2;
    }

    this.player.x += moveX * this.player.speed * dt;
    this.player.y += moveY * this.player.speed * dt;

    // Rajaa pelaaja canvasin sisälle
    this.player.x = Math.max(this.player.radius, Math.min(this.engine.virtualWidth - this.player.radius, this.player.x));
    this.player.y = Math.max(this.player.radius, Math.min(this.engine.virtualHeight - this.player.radius, this.player.y));

    // Toimintanappi (Space / kosketusnäytön A-nappi)
    if (this.input.isKeyJustPressed('Space')) {
      this.audio.playJump();
      this.particles.emit({
        x: this.player.x,
        y: this.player.y,
        count: 12,
        color: this.colors.primary,
        speed: 150
      });
    }

    // 2. Päivitä kohteet ja tarkista törmäykset (Collision.js: circleVsCircle)
    for (let i = this.targets.length - 1; i >= 0; i--) {
      const t = this.targets[i];
      t.pulse += dt * 4;

      if (circleVsCircle(this.player.x, this.player.y, this.player.radius, t.x, t.y, t.radius)) {
        // Kerätty kohde!
        this.score += 10;
        this.audio.playCoin();
        this.particles.emit({
          x: t.x,
          y: t.y,
          count: 20,
          color: this.colors.accent,
          speed: 200,
          size: 6
        });
        this.targets.splice(i, 1);
        this.spawnTarget();
      }
    }

    this.particles.update(dt);
    this.input.postUpdate();
  }

  render(ctx) {
    // Taustaruudukko
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < this.engine.virtualWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.engine.virtualHeight);
      ctx.stroke();
    }
    for (let y = 0; y < this.engine.virtualHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.engine.virtualWidth, y);
      ctx.stroke();
    }

    // Partikkelit (ObjectPool)
    this.particles.render(ctx);

    // Kohteet
    for (const t of this.targets) {
      const r = t.radius + Math.sin(t.pulse) * 2;
      ctx.save();
      ctx.fillStyle = t.color;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Pelaaja
    ctx.save();
    ctx.fillStyle = this.player.color;
    ctx.shadowColor = this.player.color;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // HUD (Score)
    ctx.fillStyle = this.colors.text;
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillText(`Pisteet: ${this.score}`, 24, 36);
  }
}
