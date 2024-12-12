export interface Position {
  x: number;
  y: number;
}

export interface ProjectileEffect {
  id: string;
  sourcePosition: Position;
  targetPosition: Position;
  progress: number;
  type: 'stone';
}