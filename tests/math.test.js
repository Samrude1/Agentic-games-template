import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  lerp,
  distanceSq,
  distance,
  randomRange,
  randomInt,
  angleBetween,
  degToRad,
  radToDeg,
  normalize
} from '../.agents/skills/game-init/resources/src/utils/math.js';

test('math.clamp() restricts values correctly', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('math.lerp() calculates linear interpolation correctly', () => {
  assert.equal(lerp(0, 100, 0), 0);
  assert.equal(lerp(0, 100, 0.5), 50);
  assert.equal(lerp(0, 100, 1), 100);
  assert.equal(lerp(50, 150, 0.2), 70);
});

test('math.distanceSq() calculates squared distance accurately without sqrt', () => {
  assert.equal(distanceSq(0, 0, 3, 4), 25);
  assert.equal(distanceSq(10, 10, 10, 10), 0);
  assert.equal(distance(0, 0, 3, 4), 5);
});

test('math.angle conversions degToRad and radToDeg roundtrip accurately', () => {
  assert.equal(degToRad(180), Math.PI);
  assert.equal(radToDeg(Math.PI), 180);
  assert.equal(degToRad(90), Math.PI / 2);
  assert.equal(radToDeg(Math.PI / 2), 90);
});

test('math.normalize() handles non-zero and zero vectors safely', () => {
  const norm = normalize(3, 4);
  assert.equal(norm.x, 0.6);
  assert.equal(norm.y, 0.8);

  const zero = normalize(0, 0);
  assert.equal(zero.x, 0);
  assert.equal(zero.y, 0);
});
