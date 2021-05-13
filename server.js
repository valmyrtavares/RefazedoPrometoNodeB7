const mongoose = require('mongoose')


require('dotenv').config({path:'variables.env'})

//Conexão com o banco de dados
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (error)=>{
    console.error("ERRO: " + error.message + "df")
})

require('./models/Post')

const app = require ('./app')
app.set('port', process.env.PORT||7777);
 
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor rodando na porta" + server.address().port)
})
 
