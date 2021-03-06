
const express = require('express');
const cors = require('cors');
var app = express();

const UsuarioRutas = require('./src/routes/usuario.routes');
const TorneoRutas = require('./src/routes/torneo.routes');
const LigaRutas = require('./src/routes/liga.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', UsuarioRutas,TorneoRutas,LigaRutas);


module.exports = app;