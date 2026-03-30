import react from '@farmfe/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineFarmConfig } from '@farmfe/core';

export default defineFarmConfig({
  // FarmFE supports Vite-compatible plugins via vitePlugins.
  vitePlugins: [tailwindcss()],
  plugins: [react()],
  compilation: {
    input: {
      index: './index.html',
    },
    output: {
      path: './dist',
      targetEnv: 'browser',
    },
  },
  server: {
    port: 9000,
  },
});
