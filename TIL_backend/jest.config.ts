import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  verbose: true,
  testMatch: [
    '**/*.test.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testEnvironment: 'node',
};
export default config;
