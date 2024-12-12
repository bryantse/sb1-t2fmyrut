import { EnemyType } from '../types/enemies';

export const ENEMY_CONFIG: Record<EnemyType, {
  health: number;
  speed: number;
  reward: number;
}> = {
  basic: {
    health: 100,
    speed: 2,
    reward: 10,
  },
  fast: {
    health: 75,
    speed: 3,
    reward: 15,
  },
  strong: {
    health: 200,
    speed: 1.5,
    reward: 25,
  },
};