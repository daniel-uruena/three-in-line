export * from './MongoDatabase'

export interface IDatabase {
  connect(): Promise<any>
  close(): void
}

export interface IDatabaseConfig {
  HOST: string
  PORT: string
  DATABASE: string
  USER?: string
  PASSWORD?: string
  COLLECTION_NAME?: string
  TABLE_NAME?: string
}
