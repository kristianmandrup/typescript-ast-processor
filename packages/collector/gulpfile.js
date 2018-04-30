const gulp = require('gulp')
const typedoc = require('gulp-typedoc')
gulp.task('typedoc', function() {
  return gulp.src(['src/**/*.ts']).pipe(
    typedoc({
      module: 'commonjs',
      target: 'es2017',
      out: 'docs/api',
      name: 'TypeScript AST Processor',
    }),
  )
})
