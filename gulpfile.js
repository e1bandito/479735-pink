"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var del = require("del");
var imagemin = require("gulp-imagemin");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var pump = require("pump");
var rename = require("gulp-rename");
var run = require("run-sequence");
var svgstore = require("gulp-svgstore");
var uglify = require("gulp-uglify");
var webp = require("gulp-webp");
var ghPages = require('gulp-gh-pages');

//Автопрефиксер и минификация
gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

//Минификация JS
gulp.task("js", function (cb) {
  pump([
    gulp.src(["js/*.js","!js/*.min.js"]),
    uglify()
    .pipe(rename({suffix: ".min"})),
    gulp.dest("build/js")
  ],
  cb
  );
});

//Оптимизация изображений
gulp.task("images", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("img"));
});

//Конвертация в webp
gulp.task("webp", function () {
  return gulp.src("img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
});

//SVG спрайт
gulp.task("sprite", function () {
  return gulp.src("img/sprite-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

//posthtml-include
gulp.task("html", function () {
  return gulp.src("*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest("build"));
});

//Очистка build
gulp.task("clean", function () {
  return del("build");
});

//Копирование в build
gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**"
  ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});


//Запуск сборки
gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "js",
    "sprite",
    "html",
    done
  );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.task('ghPages', function() {
  return gulp.src('build/**/*')
    .pipe(ghPages());
});

  gulp.watch("sass/**/*.scss", ["style"]).on("change", server.reload);
  gulp.watch("js/*.js", ["js"]).on("change", server.reload);
  gulp.watch("*.html", ["html"]).on("change", server.reload);
});
