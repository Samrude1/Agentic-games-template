/**
 * AssetLoader.js
 * Promise-based image and audio asset preloader with loading progress tracking.
 */
export class AssetLoader {
  constructor() {
    this.images = new Map();
    this.total = 0;
    this.loaded = 0;
  }

  /**
   * Loads an image and stores it by key.
   * @param {string} key
   * @param {string} src Relative URL / path
   * @returns {Promise<HTMLImageElement>}
   */
  loadImage(key, src) {
    this.total++;
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loaded++;
        this.images.set(key, img);
        resolve(img);
      };
      img.onerror = (err) => {
        console.error(`AssetLoader: Failed to load image "${key}" at "${src}"`, err);
        reject(err);
      };
      img.src = src;
    });
  }

  /**
   * Batch loads multiple images.
   * @param {Record<string, string>} manifest Object of { key: src }
   * @param {(progress: number) => void} [onProgress]
   */
  async loadManifest(manifest, onProgress = null) {
    const entries = Object.entries(manifest);
    const promises = entries.map(([key, src]) =>
      this.loadImage(key, src).then((img) => {
        if (onProgress) {
          onProgress(this.progress);
        }
        return img;
      })
    );
    await Promise.all(promises);
    return this.images;
  }

  getImage(key) {
    return this.images.get(key) || null;
  }

  get progress() {
    return this.total === 0 ? 1.0 : this.loaded / this.total;
  }
}
