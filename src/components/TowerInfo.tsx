import React from 'react';
import { Tower } from '../types/game';
import { getUpgradeCost } from '../utils/towerUtils';

interface TowerInfoProps {
  tower: Tower;
  otters: number;
  onUpgrade: () => void;
}

const TowerInfo: React.FC<TowerInfoProps> = ({ tower, otters, onUpgrade }) => {
  const upgradeCost = getUpgradeCost(tower);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Selected Tower</h3>
      <div className="space-y-2">
        <p>Level: {tower.level}</p>
        <p>Damage: {tower.damage}</p>
        <p>Range: {tower.range}</p>
        <p>Attack Speed: {tower.attackSpeed.toFixed(1)}</p>
        
        {upgradeCost && (
          <button
            onClick={onUpgrade}
            disabled={otters < upgradeCost}
            className={`w-full mt-4 px-4 py-2 rounded-md ${
              otters >= upgradeCost
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-600'
            }`}
          >
            Upgrade ({upgradeCost} 🦦)
          </button>
        )}
      </div>
    </div>
  );
};