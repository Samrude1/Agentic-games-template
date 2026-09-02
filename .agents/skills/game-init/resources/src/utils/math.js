/**
 * math.js
 * Pelimatematiikan ja fysiikan optimoidut apufunktiot.
 */

/**
 * Rajaa arvon annettujen minimi- ja maksimiarvojen väliin.
 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Lineaarinen interpolaatio kahden luvun välillä.
 */
export function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Kahden pisteen välinen etäisyys toiseen potenssiin (Fast Distance Check).
 * Vältä Math.sqrt -kutsuja aina kun pelkkä etäisyysvertailu riittää!
 */
export function distanceSq(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

/**
 * Kahden pisteen välinen todellinen etäisyys.
 */
export function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

/**
 * Satunnainen liukuluku väliltä [min, max).
 */
export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Satunnainen kokonaisluku väliltä [min, max].
 */
export function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Kahden pisteen välinen kulma radiaaneina.
 */
export function angleBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Muuntaa asteet radiaaneiksi.
 */
export function degToRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Muuntaa radiaanit asteiksi.
 */
export function radToDeg(rad) {
  return rad * (180 / Math.PI);
}

/**
 * Normalisoi 2D-vektorin suunnan yksikköpituiseksi (pituus 1).
 */
export function normalize(x, y) {
  const len = Math.hypot(x, y);
  if (len === 0) return { x: 0, y: 0 };
  return { x: x / len, y: y / len };
}
