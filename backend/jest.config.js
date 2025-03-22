module.exports = {
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    testMatch: ['**/__tests__/**/*.test.js'],
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/config/**',
      '!src/database/**'
    ],
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      }
    }
  };
  