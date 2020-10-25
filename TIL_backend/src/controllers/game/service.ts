import { v4 as uuidv4 } from 'uuid'
import { IGame, IGameService } from './Models'

export class GameService implements IGameService {
  constructor() {
  }

  async createGame(): Promise<IGame> {
    const newGame: IGame = {
      id: uuidv4(),
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    return newGame
  }

  async getGame(gameId: string): Promise<IGame> {
    const game: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00.000',
      isFinished: false,
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    return game
  }

  async updateGame(game: IGame): Promise<IGame> {
    return game
  }

  async getGames(): Promise<IGame[]> {
    const gameHistorical: IGame[] = [{
      id: 'gameId',
      lastMovementDate: '2020-11-03 14:00:00.000',
      winner: 'X',
      isFinished: true,
      XMovements: [4,5,3],
      OMovements: [0,1],
      turn: 'O'
    }]

    return gameHistorical
  }
}
