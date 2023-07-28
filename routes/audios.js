const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const botUrl = process.env.URL_BOT
        const response = await axios.get(botUrl + "/bot/audios", { timeout: 5000, headers: {
            Authorization : "Bearer " + process.env.TOKEN_AUTHORIZATION_API
        } })
        const audios = response.data
        const APP_NAME  = process.env.APP_NAME
        const APP_ICON  = process.env.APP_ICON
        res.render("audios/audios.html", {
            botUrl,
            audios,
            APP_NAME,
            APP_ICON
        })
    } catch (error) {
        console.error(error)
        res.render("error.html")
    }
})

module.exports = {
    router
}