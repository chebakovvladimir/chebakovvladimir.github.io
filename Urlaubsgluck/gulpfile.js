"use strict";
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var glue = require("gulp-sprite-glue");

gulp.task('script', function () {
	gulp.src(['js/*.js'])
		.pipe(concat('main.script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js/release'))
});

gulp.task('sass', function () {
	gulp.src('styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('styles/css'))
});
gulp.task('sass:ie', function(){
	gulp.src('styles/ie/ie.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('styles/css'));
});

gulp.task('image', function () {
	gulp.src(['img/images/*'])
		.pipe(imagemin())
		.pipe(gulp.dest('img/release'))
});

gulp.task('glue', function () {
	gulp.src("img/sprites")
		.pipe(glue({
			css: 'styles',
			img: 'img/release'
		}));
});

gulp.task('default', function () {
	gulp.start(['script', 'sass','sass:ie']);


	gulp.watch('styles/*.scss', ['sass','sass:ie'], function () {
		gulp.start('sass'),
			gulp.start('sass:ie');
	});
	

	gulp.watch("js/*.js", function (event) {
		gulp.start('script');
	});

});