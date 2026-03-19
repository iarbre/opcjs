// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import path from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                // Set the root directory for resolving tsconfig.json
                tsconfigRootDir: path.resolve(__dirname),
                project: ['./tsconfig.json', './tsconfig.test.json'], // or multiple configs
            },
        }
    },
);