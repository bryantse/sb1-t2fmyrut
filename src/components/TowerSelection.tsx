import React from 'react';
import { Target } from 'lucide-react';

const towerTypes = [
  { name: 'Basic Stone Thrower', cost: 100, damage: 1, range: 100, attackSpeed: 1 },
  { name: 'Heavy Stone Launcher', cost: 200, damage: 2, range: 120, attackSpeed: 0.8 },
  { name: 'Rapid Stone Slinger', cost: 300, damage: 1, range: 80, attackSpeed: 2 },
];

interface TowerSelectionProps {
  otters: number;
  onSelectTower: (towerType: number) => void;
}

const TowerSelection: React.FC<TowerSelectionProps> = ({ otters, onSelectTower }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Tower Shop</h2>
      <div className="grid grid-cols-1 gap-4">
        {towerTypes.map((tower, index) => (
          <button
            key={index}
            onClick={() => onSelectTower(index)}
            disabled={otters < tower.cost}
            className={`p-4 rounded-md flex items-center justify-between ${
              otters >= tower.cost
                ? 'bg-blue-100 hover:bg-blue-200'
                : 'bg-gray-100 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Target className="text-blue-500" />
              <div>
                <h3 className="font-semibold">{tower.name}</h3>
                <p className="text-sm text-gray-600">
                  DMG: {tower.damage} | Range: {tower.range} | Speed: {tower.attackSpeed}
                </p>
              </div>
            </div>
            <span className="font-bold text-yellow-600">{tower.cost} 🦦</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TowerSelection;