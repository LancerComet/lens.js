process.env.NODE_ENV = 'testing'

const path = require('path')
const aliasify = require("aliasify")
const envify = require("envify/custom")
const projectRoot = path.resolve(__dirname, '../')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],

    // browserDisconnectTimeout: 0,
    // browserNoActivityTimeout: 0,

    frameworks: ['mocha', 'sinon-chai', 'browserify'],

    reporters: ['spec'],

    files: [projectRoot + '/test/specs/**/*.js'],

    preprocessors: {
      [projectRoot + '/test/specs/**/*.js']: ['browserify']
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },

      sourceFileName: function (file) {
        return file.originalPath
      }
    },

    browserify: {
      debug: true,
      extensions: ['.js'],
      configure: function (bundle) {
        bundle.on('prebundle', function () {
          bundle
            .transform('babelify', { presets: ['es2015', 'stage-2'] })
            .transform(aliasify, { aliases: { 'src': projectRoot + '/src' } })
            .transform(envify({ NODE_ENV: 'testing' }))
        })
      }
    }

  })
}
