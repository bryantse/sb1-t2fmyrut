import React, { useEffect, useRef } from 'react';
import { Position, Tower, Enemy, ProjectileEffect } from '../types/game';
import { getProjectilePosition } from '../utils/projectileUtils';
import { GAME_CONFIG } from '../config/gameConfig';

interface GameBoardProps {
  width: number;
  height: number;
  enemies: Enemy[];
  towers: Tower[];
  projectiles: ProjectileEffect[];
  selectedTower: Tower | null;
  onPlaceTower: (position: Position) => void;
  onSelectTower: (tower: Tower) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  width,
  height,
  enemies,
  towers,
  projectiles,
  selectedTower,
  onPlaceTower,
  onSelectTower,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw path
    ctx.beginPath();
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 40;
    GAME_CONFIG.path.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw towers
    towers.forEach((tower) => {
      ctx.beginPath();
      ctx.fillStyle = tower === selectedTower ? '#60A5FA' : '#3B82F6';
      ctx.arc(tower.position.x, tower.position.y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Draw range circle if selected
      if (tower === selectedTower) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.lineWidth = 2;
        ctx.arc(tower.position.x, tower.position.y, tower.range, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // Draw projectiles
    projectiles.forEach((projectile) => {
      const pos = getProjectilePosition(projectile);
      ctx.beginPath();
      ctx.fillStyle = '#666666';
      ctx.arc(pos.x, pos.y, GAME_CONFIG.projectiles.stone.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw enemies
    enemies.forEach((enemy) => {
      ctx.beginPath();
      ctx.fillStyle = '#EF4444';
      ctx.arc(enemy.position.x, enemy.position.y, 15, 0, Math.PI * 2);
      ctx.fill();

      // Draw health bar
      const healthBarWidth = 30;
      const healthBarHeight = 4;
      const healthPercentage = enemy.health / GAME_CONFIG.enemies[enemy.type].health;
      
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(
        enemy.position.x - healthBarWidth / 2,
        enemy.position.y - 20,
        healthBarWidth,
        healthBarHeight
      );
      
      ctx.fillStyle = '#10B981';
      ctx.fillRect(
        enemy.position.x - healthBarWidth / 2,
        enemy.position.y - 20,
        healthBarWidth * healthPercentage,
        healthBarHeight
      );
    });
  }, [width, height, enemies, towers, projectiles, selectedTower]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicked on existing tower
    const clickedTower = towers.find(tower => 
      Math.hypot(tower.position.x - x, tower.position.y - y) <= 20
    );
    
    if (clickedTower) {
      onSelectTower(clickedTower);
    } else {
      onPlaceTower({ x, y });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      className="border-2 border-gray-300 rounded-lg"
    />
  );
};

export default GameBoard;