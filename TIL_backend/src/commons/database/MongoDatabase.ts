import Mongoose, { Model } from 'mongoose'
import { IDatabase, IDATABASECONFIG } from './index'
import { v4 as uuidv4 } from 'uuid'

export default class MongoDatabase implements IDatabase {

  private connectionString: string
  private database: Mongoose.Mongoose | undefined
  GameModel: Model<Mongoose.Document>

  constructor(config: IDATABASECONFIG) {
    this.connectionString = `mongodb://${config.HOST}:${config.PORT}/${config.DATABASE}`
    const gameSchema = new Mongoose.Schema({
      _id: { type: String, default: () => uuidv4() },
      lastMovementDate: String,
      isFinished: Boolean,
      winner: String,
      winnerLine: [Number],
      XMovements: [Number],
      OMovements: [Number],
      turn: String
    }, { versionKey: false })
    this.GameModel = Mongoose.model('Game', gameSchema)
  }

  async connect(): Promise<Mongoose.Mongoose> {
    if (this.database && this.database.connection.readyState) {
      return this.database
    }
    return this.database = await Mongoose.connect(this.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  async close() {
    if (this.database && this.database.connection.readyState) {
      await this.database.connection.close()
    }
  }
}
