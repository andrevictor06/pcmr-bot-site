const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const botUrl = process.env.URL_BOT
        const response = await axios.get(botUrl + "/bot/figurinhas", { timeout: 5000, headers: {
            Authorization : "Bearer " + process.env.TOKEN_AUTHORIZATION_API
        } })
        const figurinhas = response.data

        res.render("figurinhas/figurinhas.html", {
            botUrl,
            figurinhas
        })
    } catch (error) {
        console.error(error)
        res.render("error.html")
    }
})

module.exports = {
    router
}