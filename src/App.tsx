import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import TowerSelection from './components/TowerSelection';
import TowerInfo from './components/TowerInfo';
import { GameState, Tower } from './types/game';
import { useGameLoop } from './hooks/useGameLoop';
import { useWaveSpawner } from './hooks/useWaveSpawner';
import { TOWER_CONFIG } from './config/towers';
import { upgradeTower } from './utils/towerUtils';
import { isTowerPlacementValid } from './utils/collision';

const INITIAL_STATE: GameState = {
  otters: 500,
  lives: 20,
  wave: 1,
  enemies: [],
  towers: [],
  projectiles: [],
  gameOver: false,
  paused: true,
  selectedTower: null,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [selectedTowerType, setSelectedTowerType] = useState<number | null>(null);
  const { startWave } = useWaveSpawner(gameState, setGameState);
  useGameLoop(gameState, setGameState);

  const handlePlaceTower = (position: Position) => {
    if (selectedTowerType === null) return;
    
    const towerConfig = Object.values(TOWER_CONFIG)[selectedTowerType];
    if (gameState.otters >= towerConfig.cost) {
      // Check if placement is valid
      if (!isTowerPlacementValid(position, gameState.towers)) {
        return;
      }

      const newTower: Tower = {
        id: Date.now().toString(),
        position,
        type: Object.keys(TOWER_CONFIG)[selectedTowerType] as TowerType,
        lastAttack: 0,
        level: 1,
        ...towerConfig,
      };

      setGameState(prev => ({
        ...prev,
        otters: prev.otters - towerConfig.cost,
        towers: [...prev.towers, newTower],
      }));
    }
  };

  const handleSelectTower = (tower: Tower) => {
    setGameState(prev => ({
      ...prev,
      selectedTower: tower,
    }));
    setSelectedTowerType(null);
  };

  const handleUpgradeTower = () => {
    if (!gameState.selectedTower) return;
    
    const upgradeCost = getUpgradeCost(gameState.selectedTower);
    if (!upgradeCost || gameState.otters < upgradeCost) return;

    setGameState(prev => ({
      ...prev,
      otters: prev.otters - upgradeCost,
      towers: prev.towers.map(tower => 
        tower.id === prev.selectedTower?.id ? upgradeTower(tower) : tower
      ),
      selectedTower: prev.selectedTower ? upgradeTower(prev.selectedTower) : null,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center text-blue-800">
          Otter Defense: Stone Guardians
        </h1>
        
        <GameControls
          otters={gameState.otters}
          lives={gameState.lives}
          wave={gameState.wave}
          paused={gameState.paused}
          onTogglePause={() => setGameState(prev => ({ ...prev, paused: !prev.paused }))}
          onStartWave={() => {
            startWave();
            setGameState(prev => ({
              ...prev,
              paused: false,
            }));
          }}
        />
        
        <div className="flex gap-6">
          <div className="flex-1">
            <GameBoard
              width={800}
              height={600}
              enemies={gameState.enemies}
              towers={gameState.towers}
              projectiles={gameState.projectiles}
              selectedTower={gameState.selectedTower}
              onPlaceTower={handlePlaceTower}
              onSelectTower={handleSelectTower}
            />
          </div>
          
          <div className="w-80 space-y-4">
            <TowerSelection
              otters={gameState.otters}
              onSelectTower={(type) => {
                setSelectedTowerType(type);
                setGameState(prev => ({ ...prev, selectedTower: null }));
              }}
            />
            
            {gameState.selectedTower && (
              <TowerInfo
                tower={gameState.selectedTower}
                otters={gameState.otters}
                onUpgrade={handleUpgradeTower}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;