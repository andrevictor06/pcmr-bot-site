const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const hpp = require('hpp')
const squirrelly = require("squirrelly")
const cookieSession = require('cookie-session')
const cookieParser = require("cookie-parser");

function init() {
    const app = express()

    app.set('views', './views')
    app.engine('html', squirrelly.renderFile)
    app.use(cookieSession({
        name: 'session',
        keys:  ['user_session', 'logged_in'],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }))
    app.use(cookieParser());

    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                "script-src": ["'self'", "code.jquery.com", "unpkg.com", "cdnjs.cloudflare.com"],
                "style-src": ["'self'", "unpkg.com", "cdnjs.cloudflare.com"],
                "img-src": ["'self'", process.env.BOT_URL],
                "upgrade-insecure-requests": process.env.ENVIRONMENT == "PRD" ? [] : null
            },
        },
        crossOriginEmbedderPolicy: false
    }))
    app.use(bodyParser.json())
    app.use(express.urlencoded());
    app.use(hpp())

    /*app.all('/*', (req, res, next) => {
        console.log(req.path, " req.path");
        if(req.path == "/login" || validacaoCookieSession(req.cookies)){
            next()    
        }else{
            res.redirect("/login")
        }
    });*/
    app.use("/", express.static("./assets"))
    initRoutes(app, "./routes") // views
    // initRoutes(app, "./api") // api

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server UP on port ${process.env.SERVER_PORT}`)
    })
}

function requireAuthentication(req, res, next) {
        if(validacaoCookieSession(req.cookies)){
            next()    
        }else{
            res.redirect("/login")
        }
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
            if(routePath == "/login"){
                app.use(routePath, route.router)
            }else{
                app.use(routePath, requireAuthentication, route.router)
            }
        })
    } catch (error) { console.error(error) }
}

function validacaoCookieSession(cookie){
    if(cookie.user_session == "email@email.com")
        return true
    return false
}

module.exports = {
    init
}