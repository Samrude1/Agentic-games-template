import test from 'node:test';
import assert from 'node:assert/strict';
import { ObjectPool } from '../.agents/skills/game-init/resources/src/utils/ObjectPool.js';

test('ObjectPool pre-populates instances correctly', () => {
  let createdCount = 0;
  const pool = new ObjectPool(() => {
    createdCount++;
    return { id: createdCount, active: false };
  }, 20);

  assert.equal(pool.freeCount, 20);
  assert.equal(pool.activeCount, 0);
  assert.equal(createdCount, 20);
});

test('ObjectPool acquire and release cycles maintain zero leak', () => {
  const pool = new ObjectPool(() => ({ x: 0, y: 0 }), 5);

  const obj1 = pool.acquire();
  const obj2 = pool.acquire();

  assert.equal(pool.freeCount, 3);
  assert.equal(pool.activeCount, 2);

  pool.release(obj1);
  assert.equal(pool.freeCount, 4);
  assert.equal(pool.activeCount, 1);

  pool.release(obj2);
  assert.equal(pool.freeCount, 5);
  assert.equal(pool.activeCount, 0);
});

test('ObjectPool grows dynamically if capacity exceeded', () => {
  const pool = new ObjectPool(() => ({ id: Math.random() }), 2);

  const a = pool.acquire();
  const b = pool.acquire();
  const c = pool.acquire(); // Exceeds initial size

  assert.equal(pool.activeCount, 3);
  assert.equal(pool.freeCount, 0);

  pool.release(a);
  pool.release(b);
  pool.release(c);

  assert.equal(pool.freeCount, 3);
  assert.equal(pool.activeCount, 0);
});
