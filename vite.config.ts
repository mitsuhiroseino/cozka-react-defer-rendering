import packagejson from '@cozka/rollup-create-dist-packagejson';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs-extra';
import path from 'path';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';

const INPUT = './src/index.ts';
const EXTENTION_ESM = '.js';
const EXTENTION_CJS = '.cjs';
const OUTPUT = './dist';
const OUTPUT_ESM = OUTPUT;
const OUTPUT_CJS_DIR = 'cjs';
const OUTPUT_CJS = path.join(OUTPUT, OUTPUT_CJS_DIR);
const pakcageJson = fs.readJsonSync('./package.json');
const EXTERNAL = Object.keys({
  ...pakcageJson.dependencies,
  ...pakcageJson.peerDependencies,
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isCjs = mode === 'cjs';
  return {
    plugins: [react()],
    build: {
      lib: {
        entry: INPUT,
        formats: [isCjs ? 'cjs' : 'es'],
      },
      cssCodeSplit: true,
      sourcemap: false,
      emptyOutDir: false,
      minify: false,
      rollupOptions: {
        external: (id) =>
          EXTERNAL.some((pkg) => id === pkg || id.startsWith(pkg + '/')),
        output: {
          dir: isCjs ? OUTPUT_CJS : OUTPUT_ESM,
          format: isCjs ? 'cjs' : 'es',
          exports: 'auto',
          sourcemap: false,
          entryFileNames: isCjs ? '[name].cjs' : '[name].js',
          preserveModules: true,
          interop: 'auto',
        },
        treeshake: false,
        plugins: isCjs
          ? []
          : ([
              packagejson({
                content: {
                  type: 'module',
                  main: `${OUTPUT_CJS_DIR}/index${EXTENTION_CJS}`,
                  module: `index${EXTENTION_ESM}`,
                  types: 'index.d.ts',
                  exports: {
                    '.': {
                      types: './index.d.js',
                      import: './index.js',
                      require: `./${OUTPUT_CJS_DIR}/index.cjs`,
                    },
                    './*': {
                      types: './*/index.d.js',
                      import: './*/index.js',
                      require: `./${OUTPUT_CJS_DIR}/*/index.cjs`,
                    },
                  },
                  files: ['**/*'],
                },
              }),
              copy({
                targets: [
                  {
                    src: ['LICENSE', 'README.md', 'README.ja.md'],
                    dest: 'dist',
                  },
                ],
              }),
            ] as any),
      },
    },
  };
});
