/*
 *  Babelify-gulp-starter By LancerComet at 22:14, 2016.05.28.
 *  # Carry Your World # 
 *  ---
 *  Gulpfile.
 */
const fs = require("fs")
const path = require('path')

const gulp = require("gulp")
const umd = require('gulp-umd')
const rename = require("gulp-rename")

const rootPath = path.resolve(__dirname, '.')

/**
 * App Configuration
 * @type { Object }
 */
const appConfig = {
  entry: [`${rootPath}/src/index.js`],
  srcPath: `${rootPath}/src`,
  distPath: `${rootPath}/dist`
}

const babelConfig = { 
  presets: ["es2015", "stage-2"]
}

gulp.task("default", ["js:build-umd"]);

(function jsTasks () {
  /**
   * UMD bundle.
   */
  gulp.task('js:build-umd', () => {
    gulp.src(appConfig.entry)
      .pipe(umd({
        exports: function (file) { return 'Lens' },
        namespace: function (file) { return 'Lens' }
      }))
      .pipe(rename('lens.umd.js'))
      .pipe(gulp.dest(`${appConfig.distPath}`))
      .pipe(gulp.dest(`${rootPath}/docs`))
  })
    
})();
