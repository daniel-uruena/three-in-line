import { Router, Request, Response } from 'express'
import { IGame, IGameController, IGameService } from './Models'
import { validate } from 'uuid'
import moment from 'moment'

export class GameController implements IGameController{

  routes: Router
  service: IGameService

  constructor(service: IGameService) {
    this.routes = Router()
    this.service = service

    this.routes.get('/game', this.getHistoricalGames)
    this.routes.post('/game', this.createGame)
    this.routes.get('/game/:id', this.getGame)
    this.routes.put('/game/:id', this.setGameMovement)
  }

  async createGame(req: Request, res: Response) {
    try {
      const newGame: IGame = await this.service.createGame()

      res.json(newGame)
    } catch (error) {
      console.error(error)
      res.status(500).json('Ocurrió un error al crear el juego nuevo')
    }
  }

  async getGame(req: Request, res: Response) {
    try {
      const gameId = req.params.id
      if (!validate(gameId)) {
        res.status(400).json('El id del juego no tiene un formato válido')
      }

      const game: IGame = await this.service.getGame(gameId)

      if (!game) {
        res.status(404).json('No existe un juego con el id recibido')
      }

      res.json(game)
    } catch (error) {
      console.error(error)
      res.status(500).json('Ocurrió un error al consultar el juego solicitado')
    }
  }

  async setGameMovement(req: Request, res: Response) {
    try {
      const gameId = req.params.id
      if (!validate(gameId)) {
        res.status(400).json('El id del juego no tiene un formato válido')
        return
      }
      const { XMovement, OMovement } = req.body

      if (!XMovement && !OMovement) {
        res.status(400).json('El cuerpo de la petición no tiene el formato correcto')
        return
      }

      let game: IGame = await this.service.getGame(gameId)

      if (!game) {
        res.status(404).json('No existe un juego con el id recibido')
        return
      } else if (game.isFinished || game.winner) {
        res.status(400).json('El juego esta finalizado')
        return
      }

      let currentPlayer: 'X' | 'O'

      if (XMovement) {
        game.XMovements.push(XMovement)
        game.turn = 'O'
        currentPlayer = 'X'
      } else {
        game.OMovements.push(OMovement)
        game.turn = 'X'
        currentPlayer = 'O'
      }
      game.lastMovementDate = moment().format('YYYY-MM-DD HH:mm:ss')
      this.validateWinner(game, currentPlayer)

      game = await this.service.updateGame(game)

      res.json(game)
    } catch (error) {
      console.error(error)
      res.status(500).json('Ocurrió un error al actualizar el juego')
    }
  }

  async getHistoricalGames(req: Request, res: Response) {
    try {
      const gameHistorical: IGame[] = await this.service.getGames()

      res.json(gameHistorical)
    } catch (error) {
      console.error(error)
      res.status(500).json('Ocurrió un error al consultar el historial de juegos')
    }
  }

  validateWinner(game: IGame, currentPlayer: 'X' | 'O') {
    const winnerLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    winnerLines.forEach(winnerLine => {
      if (winnerLine.every(cell => currentPlayer === 'X' ?
        game.XMovements.includes(cell) : game.OMovements.includes(cell))) {
        game.winner = currentPlayer
        game.isFinished = true
      } else if (game.XMovements.length + game.OMovements.length === 9) {
        game.winner = 'Tie'
        game.isFinished = true
      }
    })
  }
}
