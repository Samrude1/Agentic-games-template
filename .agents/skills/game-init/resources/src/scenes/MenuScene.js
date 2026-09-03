import { Scene } from '../core/State.js';

/**
 * MenuScene.js
 * Main title and start menu scene.
 * Displays high score from SaveManager, audio status, and instructions.
 */
export class MenuScene extends Scene {
  /**
   * @param {import('../core/Input.js').Input} input
   * @param {import('../core/Audio.js').SoundManager} audio
   * @param {import('../utils/SaveManager.js').SaveManager} saveManager
   */
  constructor(input, audio, saveManager) {
    super();
    this.input = input;
    this.audio = audio;
    this.saveManager = saveManager;

    this.title = 'NEON HORIZON';
    this.pulse = 0;
  }

  enter() {
    this.pulse = 0;
  }

  update(dt) {
    this.pulse += dt * 3;

    // Space or click or touch starts the game
    if (this.input.isKeyJustPressed('Space') || this.input.mouse.justPressed) {
      this.audio.init();
      this.audio.playCoin();
      this.engine.switchScene('game');
    }
  }

  render(ctx) {
    const cx = this.engine.virtualWidth / 2;
    const cy = this.engine.virtualHeight / 2;

    // Background glow
    ctx.save();
    const grad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 350);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
    grad.addColorStop(1, 'rgba(11, 15, 25, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.engine.virtualWidth, this.engine.virtualHeight);

    // Title
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '800 48px system-ui, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 20;
    ctx.fillText(this.title, cx, cy - 60);

    // Subtitle / Prompt
    const alpha = 0.6 + Math.sin(this.pulse) * 0.4;
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgba(248, 250, 252, ${alpha})`;
    ctx.font = '600 20px system-ui, sans-serif';
    ctx.fillText('PRESS SPACE OR TAP TO START', cx, cy + 20);

    // High score banner
    const high = this.saveManager ? this.saveManager.highScore : 0;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px monospace';
    ctx.fillText(`PERSONAL BEST: ${high}`, cx, cy + 80);

    // Controls footer
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Move: WASD / Arrows / Touch D-Pad  |  Action: Space / Button A', cx, this.engine.virtualHeight - 40);

    ctx.restore();
  }
}
