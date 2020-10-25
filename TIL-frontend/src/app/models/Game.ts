export interface IGame {
  _id?: string;
  lastMovementDate?: string;
  isFinished?: boolean;
  winner?: 'X' | 'O' | 'Empate';
  winnerLine?: number[];
  XMovements: number[];
  OMovements: number[];
  turn: string;
}
