import { IDatabase, MongoDatabase } from '../commons/database'

describe('Game database tests', () => {
  const mongoDatabase = new MongoDatabase()

  test('should return a database instance when connect function is called', () => {
    const database = mongoDatabase.connect()

    expect(database).toBeInstanceOf(IDatabase)
  })

  test('should close database connection when close function is called', () => {
    const result = mongoDatabase.close()

    expect(result).toBeTruthy()
  })
})
