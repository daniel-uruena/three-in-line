import { IDatabase, MongoDatabase } from '../commons/database'

describe('Game database tests', () => {

  test('should return a database instance when connect function is called', () => {
    const mongoDatabase = new MongoDatabase()

    expect(mongoDatabase).toBeInstanceOf(IDatabase)
  })
})
