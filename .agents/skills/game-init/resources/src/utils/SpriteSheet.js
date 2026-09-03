/**
 * SpriteSheet.js
 * Slices, indexes, and renders spritesheet frames and animations on HTML5 Canvas.
 */
export class SpriteSheet {
  /**
   * @param {HTMLImageElement} image Loaded sprite sheet image
   * @param {number} frameWidth Width of an individual frame in pixels
   * @param {number} frameHeight Height of an individual frame in pixels
   */
  constructor(image, frameWidth, frameHeight) {
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.cols = Math.floor(image.width / frameWidth);
    this.rows = Math.floor(image.height / frameHeight);

    this.animations = new Map();
  }

  /**
   * Registers a named animation sequence.
   * @param {string} name
   * @param {number[]} frameIndices Array of frame index numbers
   * @param {number} [frameRate=12] Frames per second
   */
  addAnimation(name, frameIndices, frameRate = 12) {
    this.animations.set(name, {
      frames: frameIndices,
      frameDuration: 1 / frameRate
    });
  }

  /**
   * Draws a specific frame centered at target coordinates.
   */
  drawFrame(ctx, frameIndex, x, y, flipX = false) {
    const col = frameIndex % this.cols;
    const row = Math.floor(frameIndex / this.cols);

    const sx = col * this.frameWidth;
    const sy = row * this.frameHeight;

    ctx.save();
    ctx.translate(x, y);
    if (flipX) {
      ctx.scale(-1, 1);
    }
    ctx.drawImage(
      this.image,
      sx, sy, this.frameWidth, this.frameHeight,
      -this.frameWidth / 2, -this.frameHeight / 2, this.frameWidth, this.frameHeight
    );
    ctx.restore();
  }
}
