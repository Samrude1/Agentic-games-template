import { Engine } from './core/Engine.js';
import { Input } from './core/Input.js';
import { SoundManager } from './core/Audio.js';
import { SaveManager } from './utils/SaveManager.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

window.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize engine (960x540 widescreen virtual resolution)
  const engine = new Engine({
    canvasId: 'game-canvas',
    width: 960,
    height: 540
  });

  // 2. Initialize input, audio, and persistent save systems
  const input = new Input(engine);
  const audio = new SoundManager();
  const saveManager = new SaveManager();

  // Link input to engine for automatic postUpdate() cycle
  engine.registerInput(input);

  // 3. Register full scene state machine
  const menuScene = new MenuScene(input, audio, saveManager);
  const gameScene = new GameScene(input, audio);
  const gameOverScene = new GameOverScene(input, audio, saveManager);

  engine.addScene('menu', menuScene);
  engine.addScene('game', gameScene);
  engine.addScene('gameover', gameOverScene);

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

