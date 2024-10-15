/**
 * Шаблонизатор pug
 *
 * Компилирует pug разметку в html
 */

// Сторонние библиотеки
import { dest, src, watch } from 'gulp' // gulp плагин
import pug from 'gulp-pug' // шаблонизатор pug
import plumber from 'gulp-plumber' // перехватывает ошибки
import notify from 'gulp-notify' // уведомляет об ошибках
import pugIncludeGlob from 'pug-include-glob' // позволяет использовать /**/*.pug конструкцию
import fs from 'fs' // чтение файлов

// Конфиги
import config from '../config.js'

// Сборка таска
export const pugBuild = () => {

    return src(`${config.src.pug.pages}/**/*.pug`) // входящие файлы
        .pipe(
            // Отлавливаем и показываем ошибки в таске
            plumber({
                errorHandler: notify.onError(err => ({
                    title: 'Ошибка в задаче pugBuild', // заголовок ошибки
                    sound: false, // уведомлять звуком
                    message: err.message, // описание ошибки
                })),
            }),
        )
        .pipe(
            pug({
                doctype: 'html', // чтобы не было обратного слеша у одиночных тэгов
                pretty: true, // сжатие html разметки
                plugins: [pugIncludeGlob()], // подключаем сторонние pug плагины
                filters: {

                    // Пользовательский фильтр экранирования html тегов
                    'special-chars': text =>
                        text.replaceAll('<', '<').replaceAll('>', '>'),
                },
            }),
        )
        .pipe(dest(config.build.root)) // исходящие файлы
        .pipe(browserSync.stream()) // обновление страницы в браузере
}

// Слежение за изменением файлов
export const pugWatch = () => {
    watch(
        [`${config.src.pug.root}/**/*.pug`],
        pugBuild,
    )
}