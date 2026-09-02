/**
 * Collision.js
 * Nopeat 2D-törmäystarkistukset (AABB ja ympyrätörmäykset).
 */

import { distanceSq, clamp } from './math.js';

/**
 * Kahden ympyrän välinen törmäystarkistus (optimoitu ilman neliöjuurta).
 * @param {number} x1
 * @param {number} y1
 * @param {number} r1 Ensimmäisen säde
 * @param {number} x2
 * @param {number} y2
 * @param {number} r2 Toisen säde
 */
export function circleVsCircle(x1, y1, r1, x2, y2, r2) {
  const radiiSum = r1 + r2;
  return distanceSq(x1, y1, x2, y2) <= radiiSum * radiiSum;
}

/**
 * Kahden akselisuuntaisen suorakulmion törmäystarkistus (AABB).
 * Olettaa koordinaattien olevan vasen yläkulma.
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
 * Ympyrän ja suorakulmion välinen törmäystarkistus.
 */
export function circleVsRect(cx, cy, radius, rx, ry, rw, rh) {
  // Etsi suorakulmion lähin piste ympyrän keskipisteeseen nähden
  const closestX = clamp(cx, rx, rx + rw);
  const closestY = clamp(cy, ry, ry + rh);

  // Tarkista onko lähin piste ympyrän säteen sisällä
  return distanceSq(cx, cy, closestX, closestY) <= radius * radius;
}

/**
 * Pisteen ja suorakulmion törmäystarkistus (esim. hiiren klikkaus painikkeeseen).
 */
export function pointInRect(px, py, rx, ry, rw, rh) {
  return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

/**
 * Pisteen ja ympyrän törmäystarkistus.
 */
export function pointInCircle(px, py, cx, cy, radius) {
  return distanceSq(px, py, cx, cy) <= radius * radius;
}
