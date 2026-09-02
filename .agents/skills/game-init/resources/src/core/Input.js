/**
 * Input.js
 * Yhtenäinen syötteiden hallinta: näppäimistö, hiiri ja mobiilikosketus (on-screen virtuaalinapit).
 */
export class Input {
  /**
   * @param {import('./Engine.js').Engine} engine
   */
  constructor(engine) {
    this.engine = engine;

    this.keys = new Set();
    this.justPressedKeys = new Set();

    this.mouse = {
      x: 0,
      y: 0,
      isDown: false,
      justPressed: false
    };

    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    this.initKeyboard();
    this.initMouse();
    this.initTouchControls();
  }

  initKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (!this.keys.has(e.code)) {
        this.justPressedKeys.add(e.code);
      }
      this.keys.add(e.code);

      // Estä nuolinäppäinten ja välilyönnin selaimen skrollaus
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });

    // Tyhjennä näppäimet kun ikkuna menettää fokuksen
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.justPressedKeys.clear();
      this.mouse.isDown = false;
    });
  }

  initMouse() {
    const canvas = this.engine.canvas;

    canvas.addEventListener('mousemove', (e) => {
      const pos = this.engine.screenToVirtual(e.clientX, e.clientY);
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;
    });

    canvas.addEventListener('mousedown', (e) => {
      this.mouse.isDown = true;
      this.mouse.justPressed = true;
      const pos = this.engine.screenToVirtual(e.clientX, e.clientY);
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;
    });

    window.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
    });

    // Estä kontekstivalikko canvasilla
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  initTouchControls() {
    const touchOverlay = document.getElementById('touch-controls');
    if (this.isTouchDevice && touchOverlay) {
      touchOverlay.classList.remove('hidden');
    }

    const buttons = document.querySelectorAll('.touch-btn');
    buttons.forEach((btn) => {
      const keyCode = btn.getAttribute('data-key');
      if (!keyCode) return;

      const handlePress = (e) => {
        e.preventDefault();
        btn.classList.add('active');
        if (!this.keys.has(keyCode)) {
          this.justPressedKeys.add(keyCode);
        }
        this.keys.add(keyCode);
      };

      const handleRelease = (e) => {
        e.preventDefault();
        btn.classList.remove('active');
        this.keys.delete(keyCode);
      };

      btn.addEventListener('touchstart', handlePress, { passive: false });
      btn.addEventListener('touchend', handleRelease, { passive: false });
      btn.addEventListener('touchcancel', handleRelease, { passive: false });
    });
  }

  /**
   * Tarkistaa onko näppäin pohjassa (esim. 'ArrowUp', 'KeyW', 'Space')
   */
  isKeyDown(code) {
    return this.keys.has(code);
  }

  /**
   * Tarkistaa onko näppäintä painettu juuri tällä framella
   */
  isKeyJustPressed(code) {
    return this.justPressedKeys.has(code);
  }

  /**
   * Kutsu tämän metodin suoritusta jokaisen framen lopussa (nollaa kertapainallukset)
   */
  postUpdate() {
    this.justPressedKeys.clear();
    this.mouse.justPressed = false;
  }
}
