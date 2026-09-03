import test from 'node:test';
import assert from 'node:assert/strict';
import { SaveManager } from '../.agents/skills/game-init/resources/src/utils/SaveManager.js';

test('SaveManager initializes with defaults when localStorage is absent', () => {
  const sm = new SaveManager('test_game_data');
  assert.equal(sm.highScore, 0);
  assert.equal(sm.get('totalRuns'), 0);
});

test('SaveManager interacts with mock localStorage correctly', () => {
  const storageMock = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (k) => storageMock.get(k) || null,
      setItem: (k, v) => storageMock.set(k, String(v)),
      removeItem: (k) => storageMock.delete(k)
    }
  };

  const sm = new SaveManager('mock_game_data');
  assert.equal(sm.highScore, 0);

  // Record initial score
  const isNew = sm.recordScore(150);
  assert.equal(isNew, true);
  assert.equal(sm.highScore, 150);

  // Lower score should not beat record
  const isLower = sm.recordScore(100);
  assert.equal(isLower, false);
  assert.equal(sm.highScore, 150);

  // Higher score sets new record
  const isHigher = sm.recordScore(300);
  assert.equal(isHigher, true);
  assert.equal(sm.highScore, 300);

  // New instance reloads persisted state
  const sm2 = new SaveManager('mock_game_data');
  assert.equal(sm2.highScore, 300);
  assert.equal(sm2.get('totalRuns'), 3);

  delete globalThis.window;
});
