const path = require('path')
const webpack = require('webpack')

webpack({
  entry: {
    index: path.resolve(__dirname, './docs/index.src.js')
  },

  output: {
    filename: 'index.build.js',
    path: path.resolve(__dirname, './docs')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ],
  }
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
