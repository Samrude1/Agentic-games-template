/**
 * Collision.js
 * High-performance 2D collision detection helpers (AABB and Circle tests).
 */

import { distanceSq, clamp } from './math.js';

/**
 * Circle vs Circle collision check (optimized without Math.sqrt).
 * @param {number} x1
 * @param {number} y1
 * @param {number} r1 First circle radius
 * @param {number} x2
 * @param {number} y2
 * @param {number} r2 Second circle radius
 */
export function circleVsCircle(x1, y1, r1, x2, y2, r2) {
  const radiiSum = r1 + r2;
  return distanceSq(x1, y1, x2, y2) <= radiiSum * radiiSum;
}

/**
 * Axis-Aligned Bounding Box (AABB) vs AABB collision check.
 * Assumes coordinates represent the top-left corner.
 */
export function rectVsRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (
    x1 < x2 + w2 &&
    x1 + w1 > x2 &&
    y1 < y2 + h2 &&
    y1 + h1 > y2
  );
}

/**
 * Circle vs Rectangle collision check.
 */
export function circleVsRect(cx, cy, radius, rx, ry, rw, rh) {
  // Find closest point on rectangle to circle center
  const closestX = clamp(cx, rx, rx + rw);
  const closestY = clamp(cy, ry, ry + rh);

  // Check if closest point lies within circle radius
  return distanceSq(cx, cy, closestX, closestY) <= radius * radius;
}

/**
 * Point inside rectangle check (e.g. mouse click on button).
 */
export function pointInRect(px, py, rx, ry, rw, rh) {
  return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

/**
 * Point inside circle check.
 */
export function pointInCircle(px, py, cx, cy, radius) {
  return distanceSq(px, py, cx, cy) <= radius * radius;
}
