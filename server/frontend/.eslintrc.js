module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": ["error", { "vars": "local", "args": "none", "ignoreRestSiblings": true }],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    },
    "overrides": [
        {
            "files": ["*.{ts,tsx}"],
            "rules": {
            },
            "parser": "@typescript-eslint/parser",
        }
    ],
};