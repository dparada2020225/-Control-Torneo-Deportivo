const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();


api.post('/login', usuarioControlador.Login);// Login de Administrador y de Clientes
api.post('/nuevoAdmin', md_autenticacion.Auth ,usuarioControlador.nuevoAdmin);// crear un nuevo admin
api.post('/registrar', usuarioControlador.registrar);// registrar usuarios de tipo user
module.exports = api;