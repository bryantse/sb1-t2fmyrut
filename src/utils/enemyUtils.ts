import { Enemy } from '../types/game';
import { GAME_CONFIG } from '../config/gameConfig';
import { moveAlongPath } from './pathUtils';

export const updateEnemyPosition = (enemy: Enemy): Enemy => {
  if (enemy.pathIndex >= enemy.path.length - 1) {
    return enemy;
  }

  const targetPos = enemy.path[enemy.pathIndex + 1];
  const newPos = moveAlongPath(enemy.position, targetPos, enemy.speed);
  
  if (newPos.x === targetPos.x && newPos.y === targetPos.y) {
    return {
      ...enemy,
      position: newPos,
      pathIndex: enemy.pathIndex + 1,
    };
  }

  return {
    ...enemy,
    position: newPos,
  };
};

export const createEnemy = (type: Enemy['type'], wave: number): Enemy => {
  const config = GAME_CONFIG.enemies[type];
  const healthMultiplier = 1 + (wave - 1) * 0.1;

  return {
    id: Date.now().toString(),
    position: { ...GAME_CONFIG.path[0] },
    health: config.health * healthMultiplier,
    speed: config.speed,
    path: GAME_CONFIG.path,
    pathIndex: 0,
    type,
  };
};