import { Router, Request, Response } from 'express'
import { IGame } from './Models'
import { v4 as uuidv4, validate } from 'uuid'


export class GameController {

  routes: Router

  constructor() {
    this.routes = Router()

    this.routes.get('/game', this.getHistoricalGames)
    this.routes.post('/game', this.createGame)
    this.routes.get('/game/:id', this.getGame)
    this.routes.put('/game/:id', this.setGameMovement)
  }

  createGame(req: Request, res: Response) {
    const newGame: IGame = {
      id: uuidv4(),
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    res.json(newGame)
  }

  getGame(req: Request, res: Response) {
    const gameId = req.params.id
    if (gameId === 'gameIdFake') {
      res.status(404).json('No existe un juego con el id recibido')
    }
    if (!validate(gameId)) {
      res.status(400).json('El id del juego no tiene un formato válido')
    }
    const game: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00.000',
      isFinished: false,
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    res.json(game)
  }

  setGameMovement(req: Request, res: Response) {
    const gameId = req.params.id
    if (gameId === 'gameIdFake') {
      res.status(404).json('No existe un juego con el id recibido')
    }
    if (!validate(gameId)) {
      res.status(400).json('El id del juego no tiene un formato válido')
    }
    const { XMovement, OMovement } = req.body
    const game: IGame = {
      id: gameId,
      lastMovementDate: '2020-11-03 14:00:00.000',
      isFinished: false,
      XMovements: [],
      OMovements: [],
      turn: 'O'
    }

    if (XMovement) {
      game.XMovements.push(XMovement)
    } else if (OMovement) {
      game.OMovements.push(OMovement)
    } else {
      res.status(400).json('El cuerpo de la petición no tiene el formato correcto')
    }

    res.json(game)
  }

  getHistoricalGames(req: Request, res: Response) {
    const gameHistorical: IGame[] = [{
      id: 'gameId',
      lastMovementDate: '2020-11-03 14:00:00.000',
      winner: 'X',
      isFinished: true,
      XMovements: [4,5,3],
      OMovements: [0,1],
      turn: 'O'
    }]

    res.json(gameHistorical)
  }
}
