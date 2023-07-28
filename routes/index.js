const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    res.redirect("home")
})

module.exports = {
    router
}