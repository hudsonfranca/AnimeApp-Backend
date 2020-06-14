module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    bail: true,
    clearMocks: true,
    testMatch: ['**/__tests__/**/*.test.ts?(x)'],
};
