const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    const APP_NAME  = process.env.APP_NAME
    const APP_ICON  = process.env.APP_ICON
    try {
        res.render("site/index.html", {APP_ICON, APP_NAME})
    } catch (error) {
        console.error(error)
        res.render("error.html")
    }
})

module.exports = {
    router
}