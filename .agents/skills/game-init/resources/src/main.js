import { Engine } from './core/Engine.js';
import { Input } from './core/Input.js';
import { SoundManager } from './core/Audio.js';
import { GameScene } from './scenes/GameScene.js';

window.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize engine (960x540 widescreen virtual resolution)
  const engine = new Engine({
    canvasId: 'game-canvas',
    width: 960,
    height: 540
  });

  // 2. Initialize input and audio systems
  const input = new Input(engine);
  const audio = new SoundManager();

  // 3. Register scenes
  const gameScene = new GameScene(input, audio);
  engine.addScene('game', gameScene);

  // 4. Manage start overlay UI
  const overlay = document.getElementById('ui-overlay');
  const btnStart = document.getElementById('btn-start');

  btnStart.addEventListener('click', () => {
    // Unlock Web Audio on first user interaction (browser autoplay policy)
    audio.init();
    audio.playCoin();

    // Hide overlay and launch gameplay loop
    overlay.classList.remove('visible');
    engine.switchScene('game');
    engine.start();
  });
});
