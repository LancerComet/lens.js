import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',

  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      name: 'Lens'
    },
    {
      file: './dist/index.esm.js',
      format: 'es'
    }
  ],

  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          target: 'es5',
          module: 'esnext'
        }
      }
    })
  ]
}
