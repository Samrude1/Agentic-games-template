import { Scene } from '../core/State.js';

/**
 * GameOverScene.js
 * Displays post-run results, high score milestones, and restart controls.
 */
export class GameOverScene extends Scene {
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

    this.finalScore = 0;
    this.isNewRecord = false;
    this.timer = 0;
  }

  enter(params = {}) {
    this.finalScore = params.score || 0;
    this.timer = 0;

    if (this.saveManager) {
      this.isNewRecord = this.saveManager.recordScore(this.finalScore);
    }

    if (this.isNewRecord) {
      this.audio.playWin();
    } else {
      this.audio.playHit();
    }
  }

  update(dt) {
    this.timer += dt;

    // Small input delay (0.5s) to prevent accidental immediate restart
    if (this.timer > 0.5) {
      if (this.input.isKeyJustPressed('Space') || this.input.mouse.justPressed) {
        this.audio.playJump();
        this.engine.switchScene('game');
      } else if (this.input.isKeyJustPressed('Escape')) {
        this.engine.switchScene('menu');
      }
    }
  }

  render(ctx) {
    const cx = this.engine.virtualWidth / 2;
    const cy = this.engine.virtualHeight / 2;

    ctx.save();

    // Dark backdrop overlay
    ctx.fillStyle = 'rgba(11, 15, 25, 0.9)';
    ctx.fillRect(0, 0, this.engine.virtualWidth, this.engine.virtualHeight);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Header
    ctx.font = '800 44px system-ui, sans-serif';
    ctx.fillStyle = '#f43f5e';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 18;
    ctx.fillText('GAME OVER', cx, cy - 80);

    ctx.shadowBlur = 0;

    // Final Score
    ctx.font = '700 32px monospace';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(`SCORE: ${this.finalScore}`, cx, cy - 10);

    // Record Notification
    if (this.isNewRecord) {
      ctx.font = '700 20px system-ui, sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('★ NEW HIGH SCORE! ★', cx, cy + 35);
    } else {
      const high = this.saveManager ? this.saveManager.highScore : this.finalScore;
      ctx.font = '16px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`BEST: ${high}`, cx, cy + 35);
    }

    // Action Prompt
    if (this.timer > 0.5) {
      const alpha = 0.5 + Math.sin(this.timer * 4) * 0.5;
      ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
      ctx.font = '600 18px system-ui, sans-serif';
      ctx.fillText('PRESS SPACE TO RETRY', cx, cy + 90);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('Press ESC for Main Menu', cx, cy + 125);
    }

    ctx.restore();
  }
}
