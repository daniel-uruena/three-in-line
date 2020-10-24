import { Router, Request, Response } from 'express'

export class GameController {

  routes: Router

  constructor() {
    this.routes = Router()

    this.routes.post('/game', this.createGame)
  }

  createGame(req: Request, res: Response) {
    const newGame = {
      XMovements: [],
      OMovements: [],
      turn: 'X'
    }

    res.json(newGame)
  }
}
