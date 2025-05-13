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
  // moduleNameMapper: {
  //   '^razorpay$': require.resolve('razorpay'),
  //   // Add other module mappings if needed
  // },
  transform: {
    // Force all .js and .ts files to be transformed by ts-jest
    '^.+\\.(ts|js|html)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',  // Add this line
  },
};
