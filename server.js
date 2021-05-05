const app = require ('./app')


app.set('port',7777);
 app.listen(app.get('port'), ()=>{
    console.log("Servidor rodando na porta 7777")
})

