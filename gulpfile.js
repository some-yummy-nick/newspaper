import { series,parallel } from "gulp"

// Пользовательские скрипты
import config from './gulp/config.js'

// Таски
import clear from './gulp/tasks/clear.js'
import server from './gulp/tasks/server.js'
import { stylesBuild, stylesWatch } from './gulp/tasks/styles.js'
import { assetsBuild, assetsWatch } from './gulp/tasks/assets.js'
import { pugBuild, pugWatch } from './gulp/tasks/pug.js'

// Устанавливаем окружение сборки dev или prod
config.setEnv()

// Сборка проекта
export const build = series(
    clear,
    pugBuild,
    stylesBuild,
    assetsBuild
)
export const proxy = server
// Слежение за изменением файлов
export const watch = series(
    build,
    server,

    parallel(
        pugWatch,
        stylesWatch,
        assetsWatch
    ),
)
export default watch