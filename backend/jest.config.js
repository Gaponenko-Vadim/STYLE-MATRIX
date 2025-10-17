// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: [
    "controllers/**/*.ts",
    "models/**/*.ts",
    "middleware/**/*.ts",
  ],
  coverageDirectory: "coverage",
};
