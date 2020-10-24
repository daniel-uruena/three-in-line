import { Server, SERVER_CONFIG } from '../startup';
import request from 'supertest'


describe('Game controller tests', () => {
  let server: Server

  beforeEach(() => {
    server = new Server(SERVER_CONFIG)

  })

  test('should return a new game object when new game endpoint is called', async () => {
    const newGame = {
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    const response = await request(server.runServer()).post('/three-in-line/game').send();

    expect(response.body).toEqual(newGame)
  })
})
