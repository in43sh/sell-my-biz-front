import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure JSX files are recognized
  },
});
