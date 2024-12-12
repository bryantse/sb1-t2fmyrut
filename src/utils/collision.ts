import { Position } from '../types/common';
import { Tower } from '../types/towers';

export const isPointInCircle = (
  point: Position,
  center: Position,
  radius: number
): boolean => {
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  return dx * dx + dy * dy <= radius * radius;
};

export const isTowerPlacementValid = (
  position: Position,
  towers: Tower[],
  minDistance: number = 40
): boolean => {
  return !towers.some(tower => 
    isPointInCircle(position, tower.position, minDistance)
  );
};