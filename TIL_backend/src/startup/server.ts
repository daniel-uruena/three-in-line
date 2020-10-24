import express, { Express } from 'express'
import { ISERVER_CONFIG } from './config';

export class Server {
  private app: Express
  private config: ISERVER_CONFIG

  constructor(config: ISERVER_CONFIG) {
    this.config = config
    this.app = express()
    this.app.use(express.json())
  }

  runServer() {
    this.app.listen(this.config.PORT, () => {
      console.log(`server running in port ${this.config.PORT}`)
    })
  }
}
