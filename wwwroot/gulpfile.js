const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));


function compileSass() {
    return gulp.src('css/site.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('content/css'));
};

function watch() {
    gulp.watch('css/site.scss', compileSass);
}

exports.watch = watch;

exports.compileSass = compileSass;
