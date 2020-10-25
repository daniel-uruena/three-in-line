export interface IGame {
  _id?: string
  lastMovementDate?: string
  isFinished?: boolean
  winner?: 'X' | 'O' | 'Tie'
  XMovements: number[]
  OMovements: number[]
  turn: string
}
