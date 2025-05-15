import packagejson from '@cozka/rollup-create-dist-packagejson';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';

const INPUT = './src/index.ts';
const EXTENTIONS = ['.ts', '.tsx', '.js', '.jsx'];
const EXTENTION_ESM = '.js';
const EXTENTION_CJS = '.cjs';
// node_modules配下のdependenciesはバンドルしない。下記の正規表現の指定をするためには'@rollup/plugin-node-resolve'が必要
const EXTERNAL = [/[\\/]node_modules[\\/]/, /[\\/]dist[\\/]/];
const OUTPUT = './dist';
const OUTPUT_ESM = OUTPUT;
const OUTPUT_CJS_DIR = 'cjs';
const OUTPUT_CJS = path.join(OUTPUT, OUTPUT_CJS_DIR);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isCjs = mode === 'cjs';
  return {
    plugins: [react()],
    build: {
      lib: {
        entry: 'src/index.ts',
        name: 'index',
        fileName: 'index',
        formats: [isCjs ? 'cjs' : 'es'],
      },
      cssCodeSplit: true,
      sourcemap: false,
      emptyOutDir: false,
      rollupOptions: {
        external: EXTERNAL,
        output: {
          dir: isCjs ? OUTPUT_CJS : OUTPUT_ESM,
          format: isCjs ? 'cjs' : 'es',
          exports: 'auto',
          sourcemap: false,
          entryFileNames: isCjs ? '[name].cjs' : '[name].js',
          preserveModules: true,
          interop: 'auto',
        },
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
