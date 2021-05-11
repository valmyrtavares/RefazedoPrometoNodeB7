const express = require('express')
const router = express.Router();



const testandoFora = "testando Fora da rota"

router.get('/', (req, res)=>{
    const ArrayExtra = ["Deu Certo","Deu certo de  mais uma vez","Sou o diferente","quatro"];
    const turn = false;
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
        texto:"<h1>Dentro do caddo</h1>",
        outroArray:[
            {cor:"amarelo",tamanho:"Large",preco:"123"},
            {cor:"perto",tamanho:"middle",preco:"133"},
            {cor:"verde",tamanho:"small",preco:"1200"},
        ],
        nomes:["Carla","Antonio"]        
    }
    res.render('home', {turn, ArrayExtra, testandoFora, tipo})
})

 router.get("/sobre",(req, res)=>{

     res.send('menu nome é  ')
 })

module.exports = router