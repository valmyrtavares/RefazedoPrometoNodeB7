const express = require('express');
const mustache = require('mustache-express')
const router = require('./routes/index')


//configuração
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', router)

app.engine('mst',mustache(__dirname+'/views/partials','.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views')

module.exports = app