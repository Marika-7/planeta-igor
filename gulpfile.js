import gulp from 'gulp';
import pug from 'gulp-pug';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import clean from 'gulp-clean';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import newer from 'gulp-newer';
import ttf2woff2 from 'gulp-ttf2woff2';

const scss = gulpSass(sass);
const { src, dest, parallel, series, watch } = gulp;

// const build_folder = 'build'; // for prod
const build_folder = 'docs'; // for github pages

function html() {
  return src('src/pug/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest(build_folder));
}

function styles() {
  return src('src/scss/main.scss')
    .pipe(scss(
      { style: 'compressed' } // for min.css
    ).on('error', scss.logError))
    .pipe(autoprefixer())
    .pipe(concat('main.min.css'))
    // add another plagin for rename file
    .pipe(dest(build_folder + '/assets/css'));
}

function scripts() {
  return src('src/js/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    // .pipe(uglify()) // for min.js
    // .pipe(concat('main.min.js'))
    .pipe(concat('main.js'))
    .pipe(dest(build_folder + '/assets/js'));
}

function server() {
  browserSync.init({
    server: {
      baseDir: './' + build_folder
    },
    notify: false,
    open: true, // автоматично відкривати браузер
    port: 3000, // порт для сервера
  });
  browserSync.watch(build_folder, browserSync.reload);
}

function deleteBuild() {
  return src([
    build_folder + '/**/*.*', 
    '!' + build_folder + '/assets/fonts/*.*',
    '!' + build_folder + '/assets/images/*.*',
    '!' + build_folder + '/robots.txt',
    '!' + build_folder + '/favicon.*',
    '!' + build_folder + '/assets/js/jquery-3.7.1.min.js',
    '!' + build_folder + '/assets/js/slick.min.js',
  ])
    .pipe(clean());
}

function watching() {
  watch('src/pug/**/*.pug', html);
  watch('src/scss/**/*.scss', styles);
  watch('src/js/**/*.js', scripts);
  // watch('src/images/*.*', images);
}

function svg() {
  return src('src/images/*.svg')
    .pipe(newer(build_folder + '/assets/images'))
    .pipe(imagemin())
    .pipe(dest(build_folder + '/assets/images'))
}

function images() {
  return src('src/images/*.*')
    .pipe(newer(build_folder + '/assets/images'))
    .pipe(imagemin())
    .pipe(webp())
    .pipe(dest(build_folder + '/assets/images'));
}

function fonts() {
  return src('src/fonts/*.ttf')
    .pipe(newer(build_folder + '/assets/fonts'))
    .pipe(ttf2woff2())
    .pipe(dest(build_folder + '/assets/fonts'));
}

// Паралельне виконання всіх завдань
const build = parallel(html, styles, scripts);

// Завдання для розробки
const dev = series(deleteBuild, build, parallel(server, watching));

// function defaultTask(cb) {
//   // place code for your default task here
//   console.log('Test task!');
//   cb();
// }

export { styles, html, scripts, build, dev, watching, svg, images, fonts };
export default dev;