import { IDATABASECONFIG } from '../commons/database'

export interface ISERVER_CONFIG {
  ENV: string
  PORT: string
  BASE_PATH: string
  MONGO_CONFIG: IDATABASECONFIG
}

export const SERVER_CONFIG: ISERVER_CONFIG = {
  ENV: process.env.APP_ENVIRONMENT || 'local',
  PORT: process.env.APP_PORT || '8080',
  BASE_PATH: '/three-in-line',
  MONGO_CONFIG: {
    HOST: process.env.MONGO_HOST || 'localhost',
    PORT: process.env.MONGO_PORT || '27017',
    DATABASE: process.env.MONGO_DATABASE || 'three-in-line'
  }
}
