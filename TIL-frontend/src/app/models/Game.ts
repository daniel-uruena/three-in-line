export interface IGame {
  _id?: string;
  lastMovementDate?: string;
  isFinished?: boolean;
  winner?: 'X' | 'O' | 'Empate';
  XMovements: number[];
  OMovements: number[];
  turn: string;
}
