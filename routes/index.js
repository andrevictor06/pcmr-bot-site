const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        res.render("site/index.html")
    } catch (error) {
        console.error(error)
        res.render("error.html")
    }
})

module.exports = {
    router
}