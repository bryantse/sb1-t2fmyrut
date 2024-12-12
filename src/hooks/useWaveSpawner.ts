import { useEffect, useRef } from 'react';
import { GameState } from '../types/game';
import { createEnemy } from '../utils/enemyUtils';
import { GAME_CONFIG } from '../config/gameConfig';

export const useWaveSpawner = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
  const spawnTimerRef = useRef<NodeJS.Timeout>();
  const enemiesLeftRef = useRef(0);

  useEffect(() => {
    if (gameState.paused || gameState.gameOver || enemiesLeftRef.current <= 0) {
      return;
    }

    const spawnEnemy = () => {
      if (enemiesLeftRef.current <= 0) return;

      const enemyTypes: Array<'basic' | 'fast' | 'strong'> = ['basic'];
      if (gameState.wave >= 3) enemyTypes.push('fast');
      if (gameState.wave >= 5) enemyTypes.push('strong');

      const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      const newEnemy = createEnemy(randomType, gameState.wave);

      setGameState(prev => ({
        ...prev,
        enemies: [...prev.enemies, newEnemy],
      }));

      enemiesLeftRef.current--;
    };

    spawnTimerRef.current = setInterval(spawnEnemy, GAME_CONFIG.waves.spawnInterval);

    return () => {
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current);
      }
    };
  }, [gameState.paused, gameState.gameOver, gameState.wave, setGameState]);

  const startWave = () => {
    enemiesLeftRef.current = GAME_CONFIG.waves.baseEnemies + 
      (gameState.wave - 1) * GAME_CONFIG.waves.enemyIncreasePerWave;
  };

  return { startWave };
};