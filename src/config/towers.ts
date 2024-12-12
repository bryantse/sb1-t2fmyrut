import { TowerType } from '../types/towers';

export const TOWER_CONFIG: Record<TowerType, {
  name: string;
  cost: number;
  damage: number;
  range: number;
  attackSpeed: number;
}> = {
  basic: {
    name: 'Basic Stone Thrower',
    cost: 100,
    damage: 1,
    range: 100,
    attackSpeed: 1,
  },
  heavy: {
    name: 'Heavy Stone Launcher',
    cost: 200,
    damage: 2,
    range: 120,
    attackSpeed: 0.8,
  },
  rapid: {
    name: 'Rapid Stone Slinger',
    cost: 300,
    damage: 1,
    range: 80,
    attackSpeed: 2,
  },
};