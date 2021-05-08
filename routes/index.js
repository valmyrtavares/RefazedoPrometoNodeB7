const express = require('express')
const router = express.Router();




router.get('/', (req, res)=>{
    const tipo = {
        objt:{cor:"amarelo",tamanho:"Large",preco:"123"},
        n:"Valmyr Tavares", 
        idade:50,
        nacionalidade:"Italiano",
         array: [
            {nome:"Carlos",idade:23}, 
            {nome:"Leandro",idade:24},
            {nome:"Fabricio",idade:34},
        ],
        outroArray:[
            {cor:"amarelo",tamanho:"Large",preco:"123"},
            {cor:"perto",tamanho:"middle",preco:"133"},
            {cor:"verde",tamanho:"small",preco:"1200"},
        ],
        nomes:["Carla","Antonio"]
    }
    res.render('home', {tipo})
})

router.get("/sobre",(req, res)=>{
    const name ="Antonio Carlos"
    res.send('menu nome é  ' + req.query.nome)
})

module.exports = router