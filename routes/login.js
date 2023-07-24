const { default: axios } = require("axios")
const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        if(await validacaoCookieSession(req.cookies)){
            res.render("site/index.html")
        }else{
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
            res.cookie("user_session", "teste516")
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

    return true
}

async function validacaoUsuarioSenha(){
    return false
}

module.exports = {
    router
}