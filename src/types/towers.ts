import { Position } from './common';

export type TowerType = 'basic' | 'heavy' | 'rapid';

export interface Tower {
  id: string;
  position: Position;
  range: number;
  damage: number;
  attackSpeed: number;
  lastAttack: number;
  cost: number;
  level: number;
  type: TowerType;
}

export interface TowerUpgrade {
  damage: number;
  range: number;
  attackSpeed: number;
  cost: number;
}