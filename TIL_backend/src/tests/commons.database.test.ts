import { IDatabaseConfig, MongoDatabase } from '../commons/database'
import Mongoose from 'mongoose'

describe('Game database tests', () => {
  const config: IDatabaseConfig = {
    HOST: 'host',
    PORT: 'port',
    DATABASE: 'database',
    COLLECTION_NAME: 'collection'
  }

  const mongoDatabase = new MongoDatabase(config)

  test('should have database instance methods when database instance is created', () => {
    expect(mongoDatabase).toHaveProperty('connect')
    expect(mongoDatabase).toHaveProperty('close')
  })

  test('should return a connected database instance when connect function is called', async () => {
    const response = {
      connection: {
        readyState: 1,
        close: jest.fn()
      }
    }
    const spyConnect = spyOn(Mongoose, 'connect').and.returnValue(Promise.resolve(response))

    const database = await mongoDatabase.connect()

    expect(database.connection.readyState).toBe(1)
    expect(spyConnect).toHaveBeenCalled()

    await mongoDatabase.close()

    expect(response.connection.close).toHaveBeenCalled()
  })
})
