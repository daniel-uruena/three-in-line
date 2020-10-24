import { Server, SERVER_CONFIG } from '../startup'
import request from 'supertest'
import * as http from 'http'
import { validate, v4 as uuidv4 } from 'uuid';
import { IGame } from "../controllers/game/Models";


describe('Game controller tests', () => {
  let server: Server = new Server(SERVER_CONFIG)
  let app: http.Server


  beforeAll(() => {
    app = server.runServer()
  })

  afterAll(() => {
    app.close()
  })

  test('should return a new game object when new game endpoint is called', async () => {
    const newGame = {
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    const response = await request(app).post('/three-in-line/game').send()

    expect(response.status).toBe(200)
    expect(response.body.XMovements).toEqual(newGame.XMovements)
    expect(response.body.OMovements).toEqual(newGame.OMovements)
    expect(response.body.turn).toEqual(newGame.turn)
    expect(validate(response.body.id)).toBeTruthy()
  })

  test('should return a saved game when client request a game by id game', async () => {
    const gameId = uuidv4()
    const gameHistory: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00.000',
      isFinished: false,
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    const response = await request(app).get(`/three-in-line/game/${gameId}`).send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual(gameHistory)
  })

  test('should return a not found error when client request a game that does not exists', async () => {
    const response = await request(app).get('/three-in-line/game/gameIdFake').send()

    expect(response.status).toBe(404)
    expect(response.text).toContain('No existe un juego con el id recibido')
  })

  test('should return a bad request error when client request a game by invalid id', async () => {
    const response = await request(app).get('/three-in-line/game/gameIdInvalid').send()

    expect(response.status).toBe(400)
    expect(response.text).toContain('El id del juego no tiene un formato válido')
  })

  test('should return the current game state when client send a player movement', async () => {
    const gameId = uuidv4()
    const gameHistory: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00.000',
      isFinished: false,
      XMovements: [3],
      OMovements: [],
      turn: 'O'
    }

    const response = await request(app).put(`/three-in-line/game/${gameId}`).send({ XMovement: 3 })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(gameHistory)
  })

  test('should return the current game state with winner when client send a player movement that wins the game',
    async () => {
      const gameId = uuidv4()
      const gameHistory: IGame = {
        id: gameId,
        lastMovementDate: '2020-11-03 14:00:00.000',
        winner: 'X',
        isFinished: true,
        XMovements: [4,5,3],
        OMovements: [0,1],
        turn: 'O'
      }

      const response = await request(app).put(`/three-in-line/game/${gameId}`).send({ XMovement: 3 })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(gameHistory)
    })

  test('should return the current game state with tie when client send a player movement that ties the game',
    async () => {
      const gameHistory: IGame = {
        id: 'gameId',
        lastMovementDate: '2020-11-03 14:00:00.000',
        winner: 'Tie',
        isFinished: true,
        XMovements: [0,1,5,6,7],
        OMovements: [2,3,4,8],
        turn: 'O'
      }

      const response = await request(app).put('/three-in-line/game/gameId').send({ XMovement: 3 })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(gameHistory)
    })

  test('should return a not found error when client send a gameId that does not exists', async () => {
    const response = await request(app).put('/three-in-line/game/gameIdFake').send()

    expect(response.status).toBe(404)
    expect(response.text).toContain('No existe un juego con el id recibido')
  })

  test('should return a bad request error when client send an invalid gameId', async () => {
    const response = await request(app).put('/three-in-line/game/gameIdInvalid').send()

    expect(response.status).toBe(400)
    expect(response.text).toContain('El id del juego no tiene un formato válido')
  })

  test('should return a bad request error when client send an invalid player movement', async () => {
    const gameId = uuidv4()
    const response = await request(app).put(`/three-in-line/game/${gameId}`).send({ movement: 3 })

    expect(response.status).toBe(400)
    expect(response.text).toContain('El cuerpo de la petición no tiene el formato correcto')
  })

  test('should return the historical of games when client request games played', async () => {
    const gameHistorical = [{
      id: 'gameId',
      lastMovementDate: '2020-11-03 14:00:00.000',
      winner: 'X',
      isFinished: true,
      XMovements: [4,5,3],
      OMovements: [0,1],
      turn: 'O'
    }]

    const response = await request(app).get('/three-in-line/game').send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual(gameHistorical)
  })
})
