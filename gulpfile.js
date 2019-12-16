var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	clean = require('gulp-clean'),
	babel = require('gulp-babel');

gulp.task('css', function () {
	return gulp
		.src('src/scss/*.scss')
		.pipe(sass({ errLogToConsole: true }))
		.pipe(gulp.dest('app/assets/css'))
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('app/assets/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function () {
	gulp
		.src('src/js/main.js')
		.pipe(gulp.dest('app/assets/js'))
		.pipe(babel())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('app/assets/js'))
		.pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('html', function () {
	gulp.src('src/*.html').pipe(gulp.dest('app')).pipe(browserSync.reload({ stream: true }));
});

gulp.task('other', function () {
	gulp.src(['src/data.json', 'src/jquery-3.4.1.min.js']).pipe(gulp.dest('app'));
});

gulp.task('archive', function () {
	gulp.src('app/*')
		.pipe(gulp.dest('.archive'));
});

gulp.task('clean', function () {
	return gulp.src('.archive').pipe(clean({ force: true }));
});

gulp.task('browser-sync', function () {
	browserSync.init(null, {
		server: {
			baseDir: 'app',
		},
	});
});
gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('default', ['archive', 'css', 'js', 'html', 'other', 'browser-sync'], function () {
	gulp.watch('src/scss/*.scss', ['css']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/*.html', ['html']);
	gulp.watch('app/*.html', ['bs-reload']);
});
