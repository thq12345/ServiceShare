module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  ignorePatterns: [
    "README.md",
    "package.json",
    "package-lock.json",
    "yarn-error.log",
    "yarn.lock",
    "**/*.png",
  ],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": 0,
  },
  plugins: ["html", "react"],
};
