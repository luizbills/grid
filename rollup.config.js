import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import banner from 'rollup-plugin-banner';

const bannerContent = '<%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>\n<%= pkg.repository.url %> | <%= pkg.license %>';

const plugins = [
  babel({
    "presets": [
      "@babel/preset-env"
    ],
  })
];

export default [{
  input: 'src/index.js',
  output: {
    sourcemap: false,
    format: 'iife',
    file: 'dist/grid.js'
  },
  plugins: [
    ...plugins,
    banner(bannerContent)
  ],
  watch: {
    clearScreen: false
  }
},{
  input: 'src/index.js',
  output: {
    sourcemap: false,
    format: 'iife',
    file: 'dist/grid.min.js'
  },
  plugins: [
    ...plugins,
    terser(),
    banner(bannerContent)
  ],
  watch: {
    clearScreen: false
  }
}];