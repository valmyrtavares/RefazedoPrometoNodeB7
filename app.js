const express = require('express');
const mustache = require('mustache-express')
const router = require('./routes/index')
const helpers = require('./helpers')
const errorHandler = require('./handler/errorHandler')


//configuração
const app = express();

app.use((req, res, next)=>{
    res.locals.h = helpers;
    res.locals.justust = '1234';
    next();
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', router)

app.use(errorHandler.notFound)

app.engine('mst',mustache(__dirname+'/views/partials','.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views')

module.exports = app