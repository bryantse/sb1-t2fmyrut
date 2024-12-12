import { Enemy } from './enemies';
import { Tower } from './towers';
import { ProjectileEffect } from './common';

export interface GameState {
  otters: number;
  lives: number;
  wave: number;
  enemies: Enemy[];
  towers: Tower[];
  projectiles: ProjectileEffect[];
  gameOver: boolean;
  paused: boolean;
  selectedTower: Tower | null;
}