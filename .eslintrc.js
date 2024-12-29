module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  plugins: ['prettier',  "unused-imports"],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "varsIgnorePattern": "^_",
                "args": "after-used",
                "argsIgnorePattern": "^_",
            },
        ]
  },
};
