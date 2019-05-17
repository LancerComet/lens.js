process.env.NODE_ENV = 'testing'

const path = require('path')
const projectRoot = path.resolve(__dirname, './')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],

    browserDisconnectTimeout: 0,
    browserNoActivityTimeout: 0,

    frameworks: ['mocha', 'sinon-chai'],

    reporters: ['spec'],

    files: [projectRoot + '/test/specs/**/*.js'],

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },

      sourceFileName (file) {
        return file.originalPath
      }
    }
  })
}
