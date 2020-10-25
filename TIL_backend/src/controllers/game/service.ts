import { IGame, IGameService } from './Models'
import { IDatabase } from '../../commons/database'
import { DATE_FORMAT } from '../../commons/utils/constants'
import moment from 'moment'

export default class GameService implements IGameService {

  private database: IDatabase

  constructor(database: IDatabase) {
    this.database = database
    this.database.connect()
  }

  async createGame(): Promise<IGame> {
    const newGame: IGame = {
      lastMovementDate: moment().format(DATE_FORMAT),
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }
    const response = await this.database.GameModel.create(newGame)
    return response._doc
  }

  async getGame(gameId: string): Promise<IGame | undefined> {
    const game = await this.database.GameModel.findById(gameId).exec()
    if (game) {
      return game.toObject()
    }
    return undefined
  }

  async updateGame(game: IGame) {
    await this.database.GameModel.update({ _id: game._id }, game)
  }

  async getGames(): Promise<IGame[]> {
    const gameHistorical = await this.database.GameModel.find()

    return gameHistorical.map((doc: any) => doc.toObject())
  }
}
