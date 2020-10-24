import { config } from 'dotenv'
import { Server, SERVER_CONFIG } from './src/startup';

config()
const server = new Server(SERVER_CONFIG)

server.runServer()
