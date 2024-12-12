import { Position, ProjectileEffect } from '../types/game';
import { GAME_CONFIG } from '../config/gameConfig';

export const createProjectile = (
  sourcePosition: Position,
  targetPosition: Position
): ProjectileEffect => ({
  id: Date.now().toString(),
  sourcePosition,
  targetPosition,
  progress: 0,
  type: 'stone',
});

export const updateProjectile = (
  projectile: ProjectileEffect
): ProjectileEffect | null => {
  const newProgress = projectile.progress + GAME_CONFIG.projectiles.stone.speed / 100;
  
  return newProgress >= 1 ? null : {
    ...projectile,
    progress: newProgress,
  };
};

export const getProjectilePosition = (
  projectile: ProjectileEffect
): Position => {
  const { sourcePosition: src, targetPosition: target, progress } = projectile;
  return {
    x: src.x + (target.x - src.x) * progress,
    y: src.y + (target.y - src.y) * progress,
  };
};