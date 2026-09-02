/**
 * Input.js
 * Unified input manager: Keyboard, Mouse, and Mobile Touch (virtual D-pad & action buttons).
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

      // Prevent arrow keys and space from scrolling the browser window
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });

    // Clear key states when window loses focus
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

    // Disable default browser context menu on canvas
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
   * Checks if a key is currently held down (e.g., 'ArrowUp', 'KeyW', 'Space')
   */
  isKeyDown(code) {
    return this.keys.has(code);
  }

  /**
   * Checks if a key was pressed on this exact frame
   */
  isKeyJustPressed(code) {
    return this.justPressedKeys.has(code);
  }

  /**
   * Call at the end of each frame to reset single-frame press states
   */
  postUpdate() {
    this.justPressedKeys.clear();
    this.mouse.justPressed = false;
  }
}
