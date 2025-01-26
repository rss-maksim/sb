import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['./**/*.(test|spec).{ts,tsx}'],
    exclude: ['./node_modules/**/*'],
  },
});
