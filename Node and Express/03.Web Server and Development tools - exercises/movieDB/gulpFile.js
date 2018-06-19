let gulp = require('gulp');
//let cleanCSS = require('gulp-clean-css');
let image = require('gulp-image');

//gulp CSS
/*
gulp.task('default', ['minify-css']);

gulp.task('minify-css', () => {
    gulp.src('./public/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'));
});
*/

//gulp Image
gulp.task('default', ['image']);

gulp.task('image', () => {
    gulp.src('./public/images/*.png')
        .pipe(image())
        .pipe(gulp.dest('./dist'));
});   





