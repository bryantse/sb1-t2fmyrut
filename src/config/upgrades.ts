import { TowerType, TowerUpgrade } from '../types/towers';

export const UPGRADE_CONFIG: Record<TowerType, TowerUpgrade[]> = {
  basic: [
    { damage: 2, range: 120, attackSpeed: 1.2, cost: 150 },
    { damage: 3, range: 140, attackSpeed: 1.4, cost: 200 },
    { damage: 4, range: 160, attackSpeed: 1.6, cost: 300 },
  ],
  heavy: [
    { damage: 3, range: 140, attackSpeed: 1, cost: 250 },
    { damage: 4, range: 160, attackSpeed: 1.2, cost: 350 },
    { damage: 6, range: 180, attackSpeed: 1.4, cost: 500 },
  ],
  rapid: [
    { damage: 1.5, range: 100, attackSpeed: 2.5, cost: 400 },
    { damage: 2, range: 120, attackSpeed: 3, cost: 600 },
    { damage: 2.5, range: 140, attackSpeed: 3.5, cost: 800 },
  ],
};