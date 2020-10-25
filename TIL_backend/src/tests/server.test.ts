import MongoDatabase from '../commons/database/MongoDatabase'
import GameService from '../controllers/game/service'
import GameController from '../controllers/game/controller'
import * as http from 'http'
import { ISERVER_CONFIG } from '../startup/config'
import Server from '../startup/server'

describe('Server tests', () => {

  test('should set server config property with configuration provided when runServer function is called',
    async() => {
      jest.mock('../commons/database/MongoDatabase', () => ({
        connect: jest.fn()
      }))
      jest.mock('../controllers/game/controller', () => ({
        routes: {}
      }))
      jest.mock('../controllers/game/service', () => {})
      const config: ISERVER_CONFIG = {
        ENV: 'dev',
        PORT: '5000',
        BASE_PATH: '/basePath',
        MONGO_CONFIG: {
          HOST: 'host',
          PORT: 'port',
          DATABASE: 'database'
        }
      }

      const server = new Server(config)
      const app = await server.runServer()

      expect(server['config']).toBe(config)
      expect(app).toBeInstanceOf(http.Server)
      app.close()
    })

})
