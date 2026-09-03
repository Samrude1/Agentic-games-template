import test from 'node:test';
import assert from 'node:assert/strict';
import {
  circleVsCircle,
  rectVsRect,
  circleVsRect,
  pointInRect,
  pointInCircle
} from '../.agents/skills/game-init/resources/src/utils/Collision.js';

test('circleVsCircle detects intersecting and non-intersecting circles', () => {
  // Overlapping
  assert.equal(circleVsCircle(0, 0, 10, 15, 0, 10), true);
  // Touching edge
  assert.equal(circleVsCircle(0, 0, 10, 20, 0, 10), true);
  // Separated
  assert.equal(circleVsCircle(0, 0, 10, 25, 0, 10), false);
});

test('rectVsRect detects AABB box collisions correctly', () => {
  // Overlapping boxes
  assert.equal(rectVsRect(0, 0, 20, 20, 10, 10, 20, 20), true);
  // Adjacent non-overlapping
  assert.equal(rectVsRect(0, 0, 10, 10, 20, 20, 10, 10), false);
  // Encapsulated
  assert.equal(rectVsRect(0, 0, 50, 50, 10, 10, 10, 10), true);
});

test('circleVsRect handles circle to rectangle intersection', () => {
  // Center inside
  assert.equal(circleVsRect(20, 20, 10, 10, 10, 30, 30), true);
  // Circle touching rectangle edge
  assert.equal(circleVsRect(5, 20, 10, 10, 10, 30, 30), true);
  // Circle completely clear of rectangle
  assert.equal(circleVsRect(0, 0, 5, 20, 20, 20, 20), false);
});

test('pointInRect and pointInCircle verify point containment', () => {
  assert.equal(pointInRect(15, 15, 10, 10, 20, 20), true);
  assert.equal(pointInRect(5, 5, 10, 10, 20, 20), false);

  assert.equal(pointInCircle(10, 10, 10, 10, 5), true);
  assert.equal(pointInCircle(20, 20, 10, 10, 5), false);
});
