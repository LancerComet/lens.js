const path = require('path')
const webpack = require('webpack')

webpack({
  entry: {
    index: path.resolve(__dirname, './src/index.js')
  },

  output: {
    filename: 'lens.umd.js',
    path: path.resolve(__dirname, './dist'),
    library: 'Lens',
    libraryTarget: 'umd'
  },

  loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
  ]
}, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
