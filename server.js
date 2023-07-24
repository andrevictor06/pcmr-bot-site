const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const hpp = require('hpp')
const squirrelly = require("squirrelly")

function init() {
    const app = express()

    app.set('views', './views')
    app.engine('html', squirrelly.renderFile)

    if (process.env.ENVIRONMENT == "PRD") {
        app.use(helmet())
        app.use(bodyParser.json())
        app.use(hpp())
    }

    app.use("/", express.static("./assets"))
    initRoutes(app, "./routes") // views
    // initRoutes(app, "./api") // api


    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server UP on port ${process.env.SERVER_PORT}`)
    })
}

function initRoutes(app, basePath) {
    try {
        fs.readdirSync(basePath).forEach((file) => {
            const route = require(path.join(__dirname, 'routes', file))

            if (route.init) {
                route.init()
            } else {
                console.log(`A rota ${file} não possui uma função 'init'.`)
            }

            const routePath = '/' + path.basename(file, path.extname(file))
            app.use(routePath, route.router)
        })
    } catch (error) { console.error(error) }
}

module.exports = {
    init
}