// 設定
module.exports = {
  testTimeout: 60000,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globalSetup: '<rootDir>/__jest__/setup.ts',
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/__jest__/**/*.test.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
