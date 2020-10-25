import express, { Express } from 'express'
import { ISERVER_CONFIG } from './config';
import { GameController, GameService } from "../controllers/game"
import cors  from 'cors'


export class Server {
  private app: Express
  private config: ISERVER_CONFIG

  constructor(config: ISERVER_CONFIG) {
    this.config = config

    const gameService = new GameService()
    const gameController = new GameController(gameService)
    this.app = express()
    this.app.use(cors({ origin: '*' }))
    this.app.use(express.json())

    this.app.use(this.config.BASE_PATH, gameController.routes)
  }

  runServer() {
    return this.app.listen(this.config.PORT, () => {
      console.log(`server running in port ${this.config.PORT}`)
    })
  }
}
