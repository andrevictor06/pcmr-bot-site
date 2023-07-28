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
    app.engine('html', squirrelly.__express)
    
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                "script-src": ["'self'", "code.jquery.com", "unpkg.com", "cdnjs.cloudflare.com"],
                "style-src": ["'self'", "unpkg.com", "cdnjs.cloudflare.com"],
                "img-src": ["'self'", process.env.PCMR_DOMAIN ? new URL(process.env.PCMR_DOMAIN).host : ""],
                "upgrade-insecure-requests": process.env.ENVIRONMENT == "PRD" ? [] : null,
                "media-src": ["'self'", process.env.PCMR_DOMAIN ? new URL(process.env.PCMR_DOMAIN).host : ""]
            },
        },
        crossOriginEmbedderPolicy: false
    }))
    app.use(cookieSession({
        name: 'session',
        keys:  ['user_session', 'logged_in'],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }))
    app.use(cookieParser());
    app.use(bodyParser.json())
    app.use(express.urlencoded());
    app.use(hpp())
    app.use(requireAuthentication)
    if (process.env.ENVIRONMENT == "DES") {
        app.use("/", express.static("./assets"))
    }
  
    initRoutes(app, "./routes") // views
    // initRoutes(app, "./api", "/api/") // api
    
    app.use("*", (req, res)=>{
        res.status = 404
        res.redirect("404")
    })
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server UP on port ${process.env.SERVER_PORT}`)
    })
}

function initRoutes(app, dirPath, urlPath = "/") {
    try {
        fs.readdirSync(dirPath).forEach((file) => {
            const route = require(path.join(__dirname, 'routes', file))

            if (route.init) {
                route.init()
            } else {
                console.log(`A rota ${file} não possui uma função 'init'.`)
            }


            const routePath = urlPath + path.basename(file, path.extname(file))
            app.use(routePath, route.router)
            
        })
    } catch (error) { console.error(error) }
}

function requireAuthentication(req, res, next) {
    res.setHeader('charset', 'utf-8')
    res.setHeader('hh-time', Date.now())
    if(validacaoCookieSession(req)){
        next()
    }else{
        res.redirect("/login")
    }
}

function validSessionPaths(req){
    return (req.path.startsWith("/login") || req.path.startsWith("/css") || req.path.startsWith("/fonts") || req.path.startsWith("/img"))
}

function validacaoCookieSession(req){
    if(validSessionPaths(req) || ( req.cookies && req.cookies.user_session == "email@email.com"))
        return true
    return false
}

module.exports = {
    init
}