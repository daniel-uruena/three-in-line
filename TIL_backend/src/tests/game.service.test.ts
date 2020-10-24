import { GameService } from '../controllers/game'
import { IGame } from '../controllers/game/Models';
import { v4 as uuidv4, validate } from 'uuid';

describe('Game service tests', () => {
  let service = new GameService()

  test('should return a new game when createGame function is called', async () => {
    const newGame: IGame = {
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    const result = await service.createGame()

    expect(result.XMovements).toEqual(newGame.XMovements)
    expect(result.OMovements).toEqual(newGame.OMovements)
    expect(result.turn).toEqual(newGame.turn)
    expect(validate(result.id)).toBeTruthy()
  })

  test('should get a saved game by id when getGame function is called', async () => {
    const gameId = uuidv4()
    const gameHistory: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00.000',
      isFinished: false,
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    const result = await service.getGame(gameId)

    expect(result).toEqual(gameHistory)
  })

  test('should update current game when updateGame function is called', async () => {
    const gameId = uuidv4()
    const gameHistory: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00.000',
      isFinished: false,
      XMovements: [2],
      OMovements: [],
      turn: 'O'
    }

    const result = await service.updateGame(gameId)

    expect(result).toEqual(gameHistory)
  })

  test('should get historical of games when getGames function is called', async () => {
    const gameHistorical = [{
      id: 'gameId',
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
