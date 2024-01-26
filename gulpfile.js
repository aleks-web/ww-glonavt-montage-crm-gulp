import gulp from 'gulp'; // Gulp
import fileinclude from 'gulp-file-include';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const scss = gulpSass(dartSass);
import sourceMaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import sassGlob from 'gulp-sass-glob';
import browserSync from 'browser-sync';


const folderApp = "app";
const folderDist = "public_html";

const dir = {
    // Дирректории приложения
    appHtml: `${folderApp}/html`,
    appScss: `${folderApp}/assets/scss`,
    appCss: `${folderApp}/assets/css`,
    appJs: `${folderApp}/assets/js`,
    appFonts: `${folderApp}/assets/fonts`,
    appImg: `${folderApp}/assets/img`,
    appComponents: `${folderApp}/components`,

    // Итоговые дирректории
    distCss: `${folderDist}/assets/css`,
    distFonts: `${folderDist}/assets/fonts`,
    distJs: `${folderDist}/assets/js`,
    distImg: `${folderDist}/assets/img`
}


export function fonts() {
    return gulp.src([`${dir.appFonts}/**/*.*`])
        .pipe(gulp.dest(dir.distFonts))
        .pipe(browserSync.stream())
}

export function img() {
    return gulp.src([`${dir.appImg}/**/*.*`])
        .pipe(gulp.dest(dir.distImg))
        .pipe(browserSync.stream())
}

export function js() {
    return gulp.src([`${dir.appJs}/**/*.js`, `${dir.appComponents}/*.js`])
        .pipe(gulp.dest(dir.distJs))
        .pipe(browserSync.stream())
}

export function sass() {
    return gulp.src([`${dir.appScss}/main.scss`])
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(scss())
        .pipe(concat('main.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(dir.distCss))
        .pipe(browserSync.stream())
}

export function css() {
    return gulp.src([`${dir.appCss}/**/*.*`])
        .pipe(gulp.dest(dir.distCss))
        .pipe(browserSync.stream())
}

export function html() {
    return gulp.src([`${dir.appHtml}/**/*.html`, '!app/html/blocks/**/*.html', '!app/html/components/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(folderDist))
        .pipe(browserSync.stream())
}

// Слежка за файлами
export function watching() {
    gulp.watch([`${dir.appScss}/**/*.scss`, `${dir.appComponents}/*.scss`], sass);
    gulp.watch([`${dir.appCss}/**/*.css`], css);
    gulp.watch([`${dir.appHtml}/**/*.html`]).on('change', html);
    gulp.watch([`${dir.appJs}/**/*.js`, `${dir.appComponents}/*.js`], js);
    gulp.watch([`${dir.appFonts}/**/*.*`], fonts);
    gulp.watch([`${dir.appImg}/**/*.*`], img);
}

// За какой папкой следить
export function browsersync() {
    browserSync.init({
        server: {
            baseDir: folderDist,
        }
    });
}

export default gulp.parallel(browsersync, html, js, sass, css, fonts, img, watching);