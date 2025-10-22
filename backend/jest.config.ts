// backend/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: { '^.+\\.(t|j)sx?$': 'babel-jest' },
  transformIgnorePatterns: ['node_modules/(?!uuid|nanoid)/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
