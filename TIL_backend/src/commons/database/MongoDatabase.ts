import Mongoose from 'mongoose'
import { IDatabase, IDatabaseConfig } from './index'

export class MongoDatabase implements IDatabase{

  private connectionString: string
  private database: Mongoose.Mongoose | undefined

  constructor(config: IDatabaseConfig) {
    this.connectionString = `mongodb://${config.HOST}:${config.PORT}/${config.DATABASE}`
  }

  async connect(): Promise<any> {
    if (this.database && this.database.connection.readyState) {
      return this.database
    }
    return this.database = await Mongoose.connect(this.connectionString)
  }

  async close() {
    if (this.database && this.database.connection.readyState) {
      await this.database.connection.close()
    }
  }
}
