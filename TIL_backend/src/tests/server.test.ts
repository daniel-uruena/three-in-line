import { Server, ISERVER_CONFIG } from '../startup';

describe('Server tests', () => {

  test('should set server config property with configuration provided when runServer function is called',
    () => {
      const config: ISERVER_CONFIG = {
        ENV: 'dev',
        PORT: '5000',
        BASE_PATH: '/basePath'
      }

      const server = new Server(config)

      expect(server['config']).toBe(config)
    })

})
