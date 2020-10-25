// export * from './MongoDatabase'

export interface IDATABASECONFIG {
  HOST: string
  PORT: string
  DATABASE: string
  USER?: string
  PASSWORD?: string
  COLLECTION_NAME?: string
  TABLE_NAME?: string
}

export interface IDatabase {
  connect(): Promise<any>
  close(): void
  GameModel: any
}
