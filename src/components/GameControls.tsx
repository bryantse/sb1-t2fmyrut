import React from 'react';
import { Coins, Heart, Play, Pause } from 'lucide-react';

interface GameControlsProps {
  otters: number;
  lives: number;
  wave: number;
  paused: boolean;
  onTogglePause: () => void;
  onStartWave: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  otters,
  lives,
  wave,
  paused,
  onTogglePause,
  onStartWave,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Coins className="text-yellow-500" />
          <span className="font-bold">{otters} Otters</span>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="text-red-500" />
          <span className="font-bold">{lives} Lives</span>
        </div>
        <div className="font-bold">Wave {wave}</div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onTogglePause}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
        >
          {paused ? <Play size={20} /> : <Pause size={20} />}
          <span>{paused ? 'Resume' : 'Pause'}</span>
        </button>
        <button
          onClick={onStartWave}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Start Wave
        </button>
      </div>
    </div>
  );
};

export default GameControls;