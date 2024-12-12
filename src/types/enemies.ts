import { Position } from './common';

export type EnemyType = 'basic' | 'fast' | 'strong';

export interface Enemy {
  id: string;
  position: Position;
  health: number;
  speed: number;
  path: Position[];
  pathIndex: number;
  type: EnemyType;
}