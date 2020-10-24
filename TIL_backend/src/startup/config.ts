export interface ISERVER_CONFIG {
  ENV: string
  PORT: string
  BASE_PATH: string
}

export const SERVER_CONFIG: ISERVER_CONFIG = {
  ENV: process.env.APP_ENVIRONMENT || 'local',
  PORT: process.env.APP_PORT || '8080',
  BASE_PATH: '/three-in-line'
}
