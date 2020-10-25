import { IGame, IGameService } from './Models'
import { IDatabase } from '../../commons/database'

export default class GameService implements IGameService {

  private database: IDatabase

  constructor(database: IDatabase) {
    this.database = database
  }

  async createGame(): Promise<IGame> {
    await this.database.connect()
    const newGame: IGame = {
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }
    const response = await this.database.GameModel.create(newGame)
    this.database.close()
    const { _id, XMovements, OMovements, turn } = response._doc
    return { _id, XMovements, OMovements, turn }
  }

  async getGame(gameId: string): Promise<IGame> {
    await this.database.connect()
    const game = await this.database.GameModel.findById(gameId).exec()
    const response = game.toObject()
    this.database.close()
    response.__v = undefined
    return response
  }

  async updateGame(game: IGame): Promise<IGame> {
    return game
  }

  async getGames(): Promise<IGame[]> {
    const gameHistorical: IGame[] = [{
      _id: 'gameId',
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
