/*
 *  Babelify-gulp-starter By LancerComet at 22:14, 2016.05.28.
 *  # Carry Your World # 
 *  ---
 *  Gulpfile.
 */
const fs = require("fs")
const path = require('path')

const gulp = require("gulp")
const gulpUtil = require("gulp-util")
const rename = require("gulp-rename")
const umd = require('gulp-umd')

const aliasify = require("aliasify")
const browserify = require("browserify")
const envify = require("envify/custom")

const rootPath = path.resolve(__dirname, '.')

/**
 * App Configuration
 * @type { Object }
 */
const appConfig = {
  srcPath: `${rootPath}/src`,
  distPath: `${rootPath}/dist`
}


/**
 * Babel Configuration.
 * @type { Object }
 */
const babelConfig = { 
  presets: ["es2015", "stage-2"]
}

/**
 * Default Task defination.
 */
gulp.task("default", ['build-umd', 'build-docs'])

/**
 * UMD bundle.
 */
gulp.task('build-umd', () => {
  gulp.src(path.resolve(__dirname, './src/index.js'))
    .pipe(umd({
      exports: function (file) { return 'Lens' },
      namespace: function (file) { return 'Lens' }
    }))
    .pipe(rename('lens.umd.js'))
    .pipe(gulp.dest(`${appConfig.distPath}`))
  })

/**
 * JS Tasks Configuration.
 * All tasks deal with javascript will be set in here.
 */
;(function docsTasks () {
  /**
   * Task for bundle only. It will exilt when bundling finished.
   */
  gulp.task('build-docs', function () {
      const docsBundler = createBundler({
        entry: `${rootPath}/docs/index.src.js`,
        isDebug: false,
        isUglify: true,
        envs: { NODE_ENV: 'production' }
      })

      docsBundler
        .on("log", gulpUtil.log)
        .on("error", function (err) {
          console.error(err.toString())
          this.emit("end")
        })

      buildExec(docsBundler, path.resolve(__dirname, './docs/index.build.js'))
  })

  /**
   * Building Function.
   */
  function buildExec (bundler, distPath) {
    return bundler
      .bundle(function () {})  // Empty function for using minifyify.
      .pipe(fs.createWriteStream(distPath))
  }
    
})();

/* Utils below. */

/**
 * Create Browserify bundler object.
 */
function createBundler ({ isDebug = true, isUglify = false, envs = { NODE_ENV: 'development' }, entry = [] }) {
  const browserifyConfig = {
    entries: entry,
    debug: isDebug,
    cache: {},
    packageCache: {},
    plugin: []
  }

  const minifyConfig = {
    map: false, 
    uglify: {
      compress: {
        drop_console: true,
        dead_code: true,
        conditionals: true,
        unused: true,
        if_return: true,
        global_defs: {
            DEBUG: false
        }
      },
      mangle: true
    }
  }

  const bundler = new browserify(browserifyConfig)
    .transform('babelify', babelConfig)

    isUglify && bundler.plugin("minifyify", minifyConfig)

    return commonTransforms(bundler)

    // Define common transformers here.
    function commonTransforms (bundler) {
      return bundler
        .transform(aliasify, {
          aliases: {
            'src': rootPath + '/src'
          }
        })
        .transform(envify(envs))
    }
}
