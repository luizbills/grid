import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

const plugins = [
  babel({
    "presets": [
      "@babel/preset-env"
    ],
  }),
];

export default [{
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'iife',
    file: 'dist/grid.js'
  },
  plugins: [
    ...plugins,
  ],
  watch: {
    clearScreen: false
  }
},{
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'iife',
    file: 'dist/grid.min.js'
  },
  plugins: [
    ...plugins,
    terser()
  ],
  watch: {
    clearScreen: false
  }
}];