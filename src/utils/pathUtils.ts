import { Position } from '../types/game';

export const calculateDistance = (pos1: Position, pos2: Position): number => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const moveAlongPath = (
  currentPos: Position,
  targetPos: Position,
  speed: number
): Position => {
  const dx = targetPos.x - currentPos.x;
  const dy = targetPos.y - currentPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance <= speed) {
    return targetPos;
  }
  
  const ratio = speed / distance;
  return {
    x: currentPos.x + dx * ratio,
    y: currentPos.y + dy * ratio,
  };
};