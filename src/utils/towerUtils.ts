import { Tower, Enemy, Position, TowerUpgrade } from '../types/game';
import { calculateDistance } from './pathUtils';
import { GAME_CONFIG } from '../config/gameConfig';

export const canTowerAttack = (tower: Tower, currentTime: number): boolean => {
  return currentTime - tower.lastAttack >= 1000 / tower.attackSpeed;
};

export const findTargetInRange = (tower: Tower, enemies: Enemy[]): Enemy | null => {
  return enemies.find(enemy => 
    calculateDistance(tower.position, enemy.position) <= tower.range
  ) || null;
};

export const attackEnemy = (enemy: Enemy, damage: number): Enemy => {
  return {
    ...enemy,
    health: enemy.health - damage,
  };
};

export const getUpgradeCost = (tower: Tower): number | null => {
  const upgrades = GAME_CONFIG.towerUpgrades[tower.type];
  return tower.level < upgrades.length ? upgrades[tower.level].cost : null;
};

export const upgradeTower = (tower: Tower): Tower => {
  const upgrade = GAME_CONFIG.towerUpgrades[tower.type][tower.level];
  return {
    ...tower,
    damage: upgrade.damage,
    range: upgrade.range,
    attackSpeed: upgrade.attackSpeed,
    level: tower.level + 1,
  };
};