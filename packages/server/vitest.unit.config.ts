import { defineConfig } from 'vitest/config'

/** Vitest config for unit tests only — excludes tests/integration/. */
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/*.test.ts'],
  },
})
