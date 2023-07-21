const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const hpp = require('hpp')

function init() {
    const app = express()
    if( process.env.ENVIRONMENT == "PRD"){
        app.use(helmet())
        app.use(bodyParser.json())
        app.use(hpp())
    }
    app.use("/", express.static("routes"))

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server UP on port ${process.env.SERVER_PORT}`)
    })
}

module.exports = {
    init
}