import { Engine } from './core/Engine.js';
import { Input } from './core/Input.js';
import { SoundManager } from './core/Audio.js';
import { GameScene } from './scenes/GameScene.js';

window.addEventListener('DOMContentLoaded', () => {
  // 1. Alusta moottori (Virtuaaliresoluutio 960x540 widescreen)
  const engine = new Engine({
    canvasId: 'game-canvas',
    width: 960,
    height: 540
  });

  // 2. Alusta syötteet ja äänijärjestelmä
  const input = new Input(engine);
  const audio = new SoundManager();

  // 3. Rekisteröi skenet
  const gameScene = new GameScene(input, audio);
  engine.addScene('game', gameScene);

  // 4. Aloitusvalikon / UI-overlayn hallinta
  const overlay = document.getElementById('ui-overlay');
  const btnStart = document.getElementById('btn-start');

  btnStart.addEventListener('click', () => {
    // Alusta äänet ensimmäisestä klikkauksesta (selaimen autoplay-politiikka)
    audio.init();
    audio.playCoin();

    // Piilota overlay ja käynnistä peli
    overlay.classList.remove('visible');
    engine.switchScene('game');
    engine.start();
  });
});
