const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        if(await validacaoCookieSession(req.cookies)){
            res.render("site/index.html")
        }else{
            res.clearCookie("user_session")
            res.clearCookie("logged_in")
            res.clearCookie("teste")
            res.render("login/login.html")
        }
        
    } catch (error) {
        console.error(error)
        res.render("error.html")
    }
})

router.post("/auth", async (req, res) => {
    try {
        const {username , password} = req.body;
        if( await validacaoUsuarioSenha(username, password)){
            res.cookie("user_session", username)
            res.cookie("logged_in", "1")
            res.cookie("teste", "1")
        }
        res.redirect("/login")
    } catch (error) {
        console.error(error)
        res.render("error.html")
    }
})

async function validacaoCookieSession(cookie){
    if(cookie.user_session == "email@email.com")
        return true
    return false
}

async function validacaoUsuarioSenha(username, password){
    if(username == "email@email.com")
        return true
    return false
}

module.exports = {
    router
}