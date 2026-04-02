// @ts-check
import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import path from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig(
  { ignores: ['dist/**', 'node_modules/**', 'tsup.config.ts', 'vitest.config.ts'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: path.resolve(__dirname),
        project: ['./tsconfig.json', './tsconfig.test.json'],
      },
    },
  },
)
