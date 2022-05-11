const express = require('express');
const ligaControlador = require('../controllers/liga.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/CrearLiga', md_autenticacion.Auth ,ligaControlador.crearLiga);// crear liga 
api.put('/editarLiga/:idLiga', md_autenticacion.Auth ,ligaControlador.editarLiga);// editar liga
api.get('/MisLigas',md_autenticacion.Auth, ligaControlador.verligas);// obtener ligas que el usuario creo
api.delete('/eliminarLiga/:idLiga',md_autenticacion.Auth ,ligaControlador.eliminarLiga);// eliminar liga

api.put('/agregarEquipos/:idLiga', md_autenticacion.Auth, ligaControlador.agregarEquipos) // agregar equipos a liga

module.exports = api;