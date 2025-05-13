// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  verbose: true,
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  testEnvironment: "node",
};
