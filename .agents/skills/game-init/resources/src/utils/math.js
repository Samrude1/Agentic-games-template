/**
 * math.js
 * Optimized 2D game math and physics calculation helpers.
 */

/**
 * Clamps a numeric value between min and max bounds.
 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Linear interpolation between two values.
 */
export function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Squared distance between two 2D points (Fast distance comparison).
 * Avoids costly Math.sqrt calls whenever threshold comparison is sufficient.
 */
export function distanceSq(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

/**
 * Euclidean distance between two 2D points.
 */
export function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

/**
 * Generates a random float in range [min, max).
 */
export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Generates a random integer in range [min, max].
 */
export function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Angle in radians between two 2D points.
 */
export function angleBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Converts degrees to radians.
 */
export function degToRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Converts radians to degrees.
 */
export function radToDeg(rad) {
  return rad * (180 / Math.PI);
}

/**
 * Normalizes a 2D vector to unit length (length = 1).
 */
export function normalize(x, y) {
  const len = Math.hypot(x, y);
  if (len === 0) return { x: 0, y: 0 };
  return { x: x / len, y: y / len };
}
