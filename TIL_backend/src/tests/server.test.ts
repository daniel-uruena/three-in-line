import { Server, ISERVER_CONFIG } from '../startup'
import * as http from 'http'

describe('Server tests', () => {

  test('should set server config property with configuration provided when runServer function is called',
    async() => {
      const config: ISERVER_CONFIG = {
        ENV: 'dev',
        PORT: '5000',
        BASE_PATH: '/basePath'
      }

      const server = new Server(config)
      const app = await server.runServer()

      expect(server['config']).toBe(config)
      expect(app).toBeInstanceOf(http.Server)
      app.close()
    })

})
