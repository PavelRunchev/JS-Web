const gulp = require('gulp');
let imagemin = require('gulp-imagemin');


module.exports = () => {
    gulp.task('default', () =>
        gulp.src('./ryeAMzAb2b.jpg')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'))
    );
};