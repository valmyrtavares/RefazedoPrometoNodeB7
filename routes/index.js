const express = require('express')
const router = express.Router();



const testandoFora = "testando Fora da rota"

router.get('/', (req, res)=>{
   
    res.render('home')
})



module.exports = router