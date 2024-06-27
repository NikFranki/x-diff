module.exports = {
  root: true,
  extends: ["@franki/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: ['src/tests/'],
};