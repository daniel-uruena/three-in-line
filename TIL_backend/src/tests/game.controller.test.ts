import { v4 as uuidv4 } from 'uuid'
import { IGame, IGameController, IGameService } from '../controllers/game/Models'
import { GameController } from '../controllers/game'

class ServiceMock implements IGameService {
  async createGame(): Promise<IGame> {
    return {
      id: 'gameId',
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }
  }

  async getGame(gameId: string): Promise<IGame> {
    return {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00',
      isFinished: false,
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }
  }

  async updateGame(game:IGame): Promise<IGame> {
    return game
  }

  async getGames(): Promise<IGame[]> {
    return [{
      id: 'gameId',
      lastMovementDate: '2020-11-03 14:00:00',
      winner: 'X',
      isFinished: true,
      XMovements: [4,5,3],
      OMovements: [0,1],
      turn: 'O'
    }]
  }
}

describe('Game controller tests', () => {
  let service: IGameService
  let controller: IGameController
  let res: any
  let req: any
  let json: any


  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2020-11-03 14:00:00').getTime())
  })

  beforeEach(() => {
    service = new ServiceMock()
    controller = new GameController(service)
    json = jest.fn()
    res = {
      status: jest.fn(() => ({
        json
      })),
      json
    }
  })

  test('should return a new game object when new game endpoint is called', async () => {
    const newGame = {
      id: uuidv4(),
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }
    const spy = spyOn(service, 'createGame').and.returnValue(Promise.resolve(newGame))

    await controller.createGame(req, res)

    expect(res.json).toHaveBeenCalledWith(newGame)
    expect(spy).toHaveBeenCalled()
  })

  test('should return a saved game when client request a game by id game', async () => {
    const gameId = uuidv4()
    req = {
      params: {
        id: gameId
      }
    }
    const gameHistory: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00',
      isFinished: false,
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }
    const spy = spyOn(service, 'getGame').and.returnValue(Promise.resolve(gameHistory))

    await controller.getGame(req, res)

    expect(res.json).toHaveBeenCalledWith(gameHistory)
    expect(spy).toHaveBeenCalledWith(gameId)
  })

  test('should return a not found error when client request a game that does not exists', async () => {
    const spy = spyOn(service, 'getGame').and.returnValue(Promise.resolve(undefined))
    req = {
      params: {
        id: uuidv4()
      }
    }

    await controller.getGame(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(json).toHaveBeenCalledWith('No existe un juego con el id recibido')
    expect(spy).toHaveBeenCalledWith(req.params.id)
  })

  test('should return a bad request error when client request a game by invalid id', async () => {
    req = {
      params: {
        id: '123'
      }
    }

    await controller.getGame(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(json).toHaveBeenCalledWith('El id del juego no tiene un formato válido')
  })

  test('should return the current game state when client send a player movement', async () => {
    const gameId = uuidv4()
    const initialGame: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00',
      isFinished: false,
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }
    const finalGame: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00',
      isFinished: false,
      XMovements: [3],
      OMovements: [],
      turn: 'O'
    }
    req = {
      params: {
        id: gameId
      },
      body: {
        XMovement: 3
      }
    }
    const spyGet = spyOn(service, 'getGame').and.returnValue(Promise.resolve(initialGame))
    const spyUpdate = spyOn(service, 'updateGame').and.returnValue(Promise.resolve(finalGame))

    await controller.setGameMovement(req, res)

    expect(res.json).toHaveBeenCalledWith(finalGame)
    expect(spyGet).toHaveBeenCalledWith(gameId)
    expect(spyUpdate).toHaveBeenCalledWith(finalGame)
  })

  test('should return the current game state with winner when client send a player movement that wins the game',
    async () => {
      const gameId = uuidv4()
      const initialGame: IGame = {
        id: gameId,
        lastMovementDate: '2020-11-03 14:00:00',
        isFinished: false,
        XMovements: [4,5],
        OMovements: [0,1],
        turn: 'X'
      }
      const finalGame: IGame = {
        id: gameId,
        lastMovementDate: '2020-11-03 14:00:00',
        winner: 'X',
        isFinished: true,
        XMovements: [4,5,3],
        OMovements: [0,1],
        turn: 'O'
      }
      req = {
        params: {
          id: gameId
        },
        body: {
          XMovement: 3
        }
      }
      const spyGet = spyOn(service, 'getGame').and.returnValue(Promise.resolve(initialGame))
      const spyUpdate = spyOn(service, 'updateGame').and.returnValue(Promise.resolve(finalGame))

      await controller.setGameMovement(req, res)

      expect(res.json).toHaveBeenCalledWith(finalGame)
      expect(spyGet).toHaveBeenCalledWith(gameId)
      expect(spyUpdate).toHaveBeenCalledWith(finalGame)
    })

  test('should return the current game state with tie when client send a player movement that ties the game',
    async () => {
      const gameId = uuidv4()
      const initialGame: IGame = {
        id: gameId,
        lastMovementDate: '2020-11-03 14:00:00',
        isFinished: false,
        XMovements: [0,1,5,6],
        OMovements: [2,3,4,8],
        turn: 'X'
      }
      const finalGame: IGame = {
        id: gameId,
        lastMovementDate: '2020-11-03 14:00:00',
        winner: 'Tie',
        isFinished: true,
        XMovements: [0,1,5,6,7],
        OMovements: [2,3,4,8],
        turn: 'O'
      }
      req = {
        params: {
          id: gameId
        },
        body: {
          XMovement: 7
        }
      }
      const spyGet = spyOn(service, 'getGame').and.returnValue(Promise.resolve(initialGame))
      const spyUpdate = spyOn(service, 'updateGame').and.returnValue(Promise.resolve(finalGame))

      await controller.setGameMovement(req, res)

      expect(res.json).toHaveBeenCalledWith(finalGame)
      expect(spyGet).toHaveBeenCalledWith(gameId)
      expect(spyUpdate).toHaveBeenCalledWith(finalGame)
    })

  test('should return a not found error when client send a gameId that does not exists', async () => {
    const gameId = uuidv4()
    req = {
      params: {
        id: gameId
      },
      body: {
        XMovement: 3
      }
    }
    const spy = spyOn(service, 'getGame').and.returnValue(Promise.resolve(undefined))

    await controller.setGameMovement(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(json).toHaveBeenCalledWith('No existe un juego con el id recibido')
    expect(spy).toHaveBeenCalledWith(gameId)
  })

  test('should return a bad request error when client send an invalid gameId', async () => {
    req = {
      params: {
        id: 'gameId'
      },
      body: {
        XMovement: 3
      }
    }

    await controller.setGameMovement(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(json).toHaveBeenCalledWith('El id del juego no tiene un formato válido')
  })

  test('should return a bad request error when client send an invalid player movement', async () => {
    const gameId = uuidv4()
    req = {
      params: {
        id: gameId
      },
      body: {
        movement: 3
      }
    }

    await controller.setGameMovement(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(json).toHaveBeenCalledWith('El cuerpo de la petición no tiene el formato correcto')
  })

  test('should return the historical of games when client request games played', async () => {
    const gameHistorical = [{
      id: 'gameId',
      lastMovementDate: '2020-11-03 14:00:00',
      winner: 'X',
      isFinished: true,
      XMovements: [4,5,3],
      OMovements: [0,1],
      turn: 'O'
    }]
    const spy = spyOn(service, 'getGames').and.returnValue(Promise.resolve(gameHistorical))

    await controller.getHistoricalGames(req, res)

    expect(json).toHaveBeenCalledWith(gameHistorical)
    expect(spy).toHaveBeenCalled()
  })
})
