import antfu from "@antfu/eslint-config"

import { dirname } from "node:path"
import { FlatCompat } from "@eslint/eslintrc"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default antfu({
  type: "app",
  formatters: true,
  typescript: true,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: "double",
  },
  ignores: [".next/**", "node_modules/**", "**/migrations/**"],
}, {
  rules: {
    "style/arrow-parens": "off",
    "no-empty": "error",
    "no-empty-function": "error",
    "node/no-process-env": "error",
    "node/no-process-exit": "error",
    "node/prefer-global/process": "off",
    "prefer-const": "error",
    "perfectionist/sort-imports": "off",
    "perfectionist/sort-named-imports": "off",
    "regexp/prefer-d": "off",
    "regexp/no-useless-escape": "off",
    "regexp/no-unused-capturing-group": "off",
    "regexp/strict": "off",
    "style/max-len": ["error", { code: 88 }],
    "style/quotes": "error",
    "ts/no-unused-vars": ["error", {
      args: "all",
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
    }],
    "ts/no-explicit-any": "error",
    "ts/no-unused-expressions": "off",
    "ts/consistent-type-definitions": "off",
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md", "LICENSE"],
    }],
  },
}).prepend([
  ...compat.config({
    extends: [
      "plugin:@next/next/recommended",
      "plugin:tailwindcss/recommended",
    ],
  }),
])
