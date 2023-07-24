const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const botUrl = process.env.BOT_URL
        const response = await axios.get(botUrl + "/figurinhas", { timeout: 5000 })
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