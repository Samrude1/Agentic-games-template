# Level Design & Economy Specification: {{GAME_TITLE}}

> **Project**: {{GAME_TITLE}}  
> **Topic**: Progression, Pacing Curves, Wave Mechanics, and Economy Formulas  

---

## 1. Pacing & Difficulty Curve

Games designed with this kit follow a standard **Tension & Release** difficulty curve:

```text
Difficulty
    ^
    |          /|        /|        /|   (Boss / Climax)
    |         / |       / |       / |
    |   /\   /  | /\   /  | /\   /  |
    |  /  \ /   |/  \ /   |/  \ /   |   (Tension & Relief cycles)
    +----------------------------------> Time / Waves
      Wave 1    Wave 2    Wave 3
```

- **Tension Phase (70% of wave)**: Escalating enemy counts and spawn frequency.
- **Relief Phase (30% of wave)**: Lull after clearing wave where player collects powerups, reviews score, and prepares.

---

## 2. Mathematical Spawn & Scaling Formulas

All scaling is calculated deterministically via math helpers (`clamp`, `lerp`):

### 2.1 Wave Enemy Count
$$\text{EnemyCount}(w) = \text{clamp}\left(\text{Math.floor}(5 + w \cdot 2.2), 5, 60\right)$$

### 2.2 Enemy Speed Escalation
$$\text{Speed}(w) = \text{BaseSpeed} \cdot \left(1 + \min(w \cdot 0.05, 1.0)\right)$$

### 2.3 Spawn Interval
$$\text{SpawnDelay}(w) = \max\left(0.4, 2.0 - w \cdot 0.12\right) \text{ seconds}$$

---

## 3. Score & Reward Economy

| Action | Points | Bonus / Multiplier | Audio Feedback |
| :--- | :--- | :--- | :--- |
| Collect Target | `+10 pts` | Increases Combo Counter | `playCoin()` |
| Hazard Destruction | `+25 pts` | Spawns particle burst | `playExplosion()` |
| Flawless Wave Clear | `+250 pts` | High-score milestone | `playWin()` |
| Combo Reset | Loss of multiplier | Triggered on taking hit | `playHit()` |

---

## 4. Wave Archetypes & Stage Blueprint

- **Wave 1 (Tutorial / Warm-up)**: Slow single targets, teaches basic movement and collection.
- **Wave 2–3 (Ramp-up)**: Introduction of bouncing hazards and split directions.
- **Wave 4 (Agility Test)**: High speed, low health targets requiring rapid positioning.
- **Wave 5+ (Endless Scaled Arcade)**: Dynamic scaling combining all enemy archetypes with high score tracking.
