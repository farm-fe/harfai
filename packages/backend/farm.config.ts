import { defineFarmConfig } from '@farmfe/core';

export default defineFarmConfig({
  compilation: {
    input: {
      index: './src/index.ts',
    },
    output: {
      path: './dist',
      targetEnv: 'node',
      format: 'esm',
    },
    // Mark all node_modules as external — they are available at runtime.
    // Using regex string patterns matched against the import specifier.
    external: [
      '^koa($|/)',
      '^@koa/(.+)',
      '^koa-body($|/)',
      '^pino($|/)',
      '^pino-pretty($|/)',
      '^uuid($|/)',
      '^zod($|/)',
      '^@harfai/shared($|/)',
    ],
    // Automatically externalize Node.js built-in modules (fs, path, http, …).
    externalNodeBuiltins: true,
    minify: false,
    sourcemap: false,
  },
});
