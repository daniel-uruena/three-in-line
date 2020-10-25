import { Request, Response } from 'express'
import { IGame } from './Game'

export * from './Game'

export interface IGameController {
  createGame(req: Request, res: Response): void
  getGame(req: Request, res: Response): void
  setGameMovement(req: Request, res: Response): void
  getHistoricalGames(req: Request, res: Response): void
}

export interface IGameService {
  createGame(): Promise<IGame>,
  getGame(gameId: string): Promise<IGame>
  updateGame(game: IGame): Promise<IGame>
  getGames(): Promise<IGame[]>
}
