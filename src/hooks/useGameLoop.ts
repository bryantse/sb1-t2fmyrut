import { useEffect, useRef } from 'react';
import { GameState } from '../types/game';
import { updateEnemyPosition } from '../utils/enemyUtils';
import { canTowerAttack, findTargetInRange, attackEnemy } from '../utils/towerUtils';
import { createProjectile, updateProjectile } from '../utils/projectileUtils';

export const useGameLoop = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
  const frameRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      if (gameState.paused || gameState.gameOver) {
        frameRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const deltaTime = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      setGameState(prevState => {
        // Update enemy positions
        const updatedEnemies = prevState.enemies
          .map(updateEnemyPosition)
          .filter(enemy => {
            if (enemy.pathIndex >= enemy.path.length - 1) {
              return false; // Enemy reached the end
            }
            return enemy.health > 0; // Remove dead enemies
          });

        // Update projectiles
        const updatedProjectiles = prevState.projectiles
          .map(updateProjectile)
          .filter(Boolean);

        // Handle tower attacks
        let enemies = [...updatedEnemies];
        const towers = prevState.towers.map(tower => {
          if (!canTowerAttack(tower, timestamp)) return tower;

          const target = findTargetInRange(tower, enemies);
          if (target) {
            enemies = enemies.map(enemy =>
              enemy.id === target.id ? attackEnemy(enemy, tower.damage) : enemy
            );
            
            // Create projectile effect
            updatedProjectiles.push(
              createProjectile(tower.position, target.position)
            );
            
            return { ...tower, lastAttack: timestamp };
          }
          return tower;
        });

        // Check for game over
        const livesLost = prevState.enemies.length - updatedEnemies.length;
        const newLives = prevState.lives - livesLost;
        const gameOver = newLives <= 0;

        // Calculate otters earned from killed enemies
        const killedEnemies = prevState.enemies.filter(
          enemy => !updatedEnemies.find(e => e.id === enemy.id)
        );
        const earnedOtters = killedEnemies.reduce(
          (sum, enemy) => sum + GAME_CONFIG.enemies[enemy.type].reward,
          0
        );

        return {
          ...prevState,
          enemies,
          towers,
          projectiles: updatedProjectiles,
          lives: newLives,
          otters: prevState.otters + earnedOtters,
          gameOver,
        };
      });

      frameRef.current = requestAnimationFrame(gameLoop);
    };

    frameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [gameState.paused, gameState.gameOver, setGameState]);
};