const express = require('express');
const torneoControlador = require('../controllers/torneo.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/crearTorneo', md_autenticacion.Auth ,torneoControlador.crearTorneo);// agregar torneo
api.put('/editarTorneo/:idTorneo', md_autenticacion.Auth ,torneoControlador.editarTorneo);// editar torneo
api.delete('/eliminarTorneo/:idTorneo',md_autenticacion.Auth ,torneoControlador.eliminarTorneo);// eliminar torneo
api.get('/verTorneos',md_autenticacion.Auth, torneoControlador.verTorneos);// ver torneos

module.exports = api;