module.exports = {
  testEnvironment: 'jsdom',
  // testEnvironment: require.resolve('jest-environment-node'),
  transformIgnorePatterns: ['/.pnp.js$'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
