const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    const APP_NAME  = process.env.APP_NAME
    const APP_ICON  = process.env.APP_ICON
    try {  
        res.render("erros/404.html", {APP_NAME, APP_ICON})
    } catch (error) {
        console.error(error)
        res.render("error.html", {APP_NAME, APP_ICON})
    }
})

module.exports = {
    router
}