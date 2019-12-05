var gulp = require ('gulp'),
    pug = require ('gulp-pug'),
    sass = require ('gulp-sass'),
    plumber  = require ('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    concat  = require ('gulp-concat'),
    sourcemaps  = require ('gulp-sourcemaps'),
    uglify  = require ('gulp-uglify'),
    imagemin = require ('gulp-imagemin'),
    watch = require ('gulp-watch');

gulp.task('pug', () => {
    return gulp.src('./src/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', () => {
    gulp.src('./src/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}))
        .pipe(autoprefixer({}))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
    });

gulp.task('js', () => {
    return gulp.src('./src/js/partials/*.js')
        .pipe(plumber())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('imagemin', () => {
    return gulp.src('./src/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('watch', () => {
    gulp.watch('./src/pug/**/*.pug', ['pug']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/partials/*.js', ['js']);
    gulp.watch('./src/img/**/*.*', ['imagemin']);
});

gulp.task('default', ['watch']);