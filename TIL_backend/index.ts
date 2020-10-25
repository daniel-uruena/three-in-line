import { config } from 'dotenv'
import { SERVER_CONFIG } from './src/startup/config'
import Server from './src/startup/server'

config()
const server = new Server(SERVER_CONFIG)

server.runServer()
