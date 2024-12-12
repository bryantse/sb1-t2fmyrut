import { ENEMY_CONFIG } from './enemies';
import { TOWER_CONFIG } from './towers';
import { UPGRADE_CONFIG } from './upgrades';
import { WAVE_CONFIG } from './waves';
import { PROJECTILE_CONFIG } from './projectiles';
import { GAME_PATH } from './path';

export const GAME_CONFIG = {
  enemies: ENEMY_CONFIG,
  towers: TOWER_CONFIG,
  towerUpgrades: UPGRADE_CONFIG,
  waves: WAVE_CONFIG,
  projectiles: PROJECTILE_CONFIG,
  path: GAME_PATH,
};