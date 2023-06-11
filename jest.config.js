const { defaults } = require('jest-config')

module.exports = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'js', 'json'],
  collectCoverage: false,
  coverageReporters: ['html'],
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.js'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'node',
  bail: false,
  clearMocks: true
}
