/**
 * Перенос файлов в продакшн
 *
 * Копирует файлы из src в build
 */

// Сторонние библиотеки
import {src, dest, watch, series} from 'gulp' // gulp плагин

// Конфиги
import config from '../config.js'

const imageBuild = () => src(
    [`${config.src.assets.images}/**/*.**`], {encoding: false}
).pipe(dest(`${config.build.images}`)).pipe(browserSync.stream())

const fontBuild = () => src(
    [`${config.src.assets.fonts}/**/*.**`], {encoding: false}
).pipe(dest(`${config.build.fonts}`)).pipe(browserSync.stream())

const iconsBuild = () => src(
    [`${config.src.root}/*.(svg|png|ico|webmanifest)`], {encoding: false}
).pipe(dest(`${config.build.root}`))

const jsBuild = () => src(
    [`${config.src.js.root}/**/*`]
).pipe(dest(`${config.build.js}`))
    .pipe(browserSync.stream())

// Выполнение всех тасков
export const assetsBuild = series(imageBuild, jsBuild, iconsBuild, fontBuild)

// Слежение за изменением файлов
export const assetsWatch = () => watch([
    `${config.src.assets.images}/**/*`,
    `${config.src.js.root}/**/*`
], assetsBuild)