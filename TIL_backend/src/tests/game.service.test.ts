import GameService from '../controllers/game/service'
import { IGame } from '../controllers/game/Models'
import { v4 as uuidv4, validate } from 'uuid'
import { IDatabase } from '../commons/database'

class DatabaseMock implements IDatabase {
  close(): void {
  }

  connect(): Promise<any> {
    return Promise.resolve(undefined)
  }

  GameModel = {
    create: jest.fn(),
    findById: () => ({ exec: jest.fn() })
  }

}

describe('Game service tests', () => {
  let database = new DatabaseMock()
  let service = new GameService(database)

  test('should return a new game when createGame function is called', async () => {
    const gameId = uuidv4()
    const newGame = {
      _doc: {
        _id: gameId,
        XMovements: [],
        OMovements: [],
        turn: 'X'
      }
    }
    const spy = spyOn(database.GameModel, 'create').and.returnValue(Promise.resolve(newGame))

    const result: IGame = await service.createGame()

    expect(result).toEqual(newGame._doc)
    expect(result._id).toEqual(gameId)
    expect(spy).toHaveBeenCalled()
  })

  test('should get a saved game by id when getGame function is called', async () => {
    const gameId = uuidv4()
    const gameHistory = {
      _id: gameId,
      lastMovementDate: '2020-11-03 14:00:00.000',
      isFinished: false,
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }
    const gameResponse = {
      toObject: () => (gameHistory)
    }
    const spy = spyOn(database.GameModel, 'findById').and.returnValue({
      exec: () => Promise.resolve(gameResponse)
    })

    const result = await service.getGame(gameId)

    expect(result).toEqual(gameHistory)
    expect(result._id).toEqual(gameId)
    expect(spy).toHaveBeenCalledWith(gameId)
  })

  test('should update current game when updateGame function is called', async () => {
    const gameId = uuidv4()
    const game: IGame = {
      _id: gameId,
      lastMovementDate: '2020-11-03 14:00:00.000',
      isFinished: false,
      XMovements: [2],
      OMovements: [],
      turn: 'O'
    }

    const result = await service.updateGame(game)

    expect(result).toEqual(game)
  })

  test('should get historical of games when getGames function is called', async () => {
    const gameHistorical = [{
      _id: 'gameId',
      lastMovementDate: '2020-11-03 14:00:00.000',
      winner: 'X',
      isFinished: true,
      XMovements: [4,5,3],
      OMovements: [0,1],
      turn: 'O'
    }]

    const result = await service.getGames()

    expect(result).toEqual(gameHistorical)
  })
})
