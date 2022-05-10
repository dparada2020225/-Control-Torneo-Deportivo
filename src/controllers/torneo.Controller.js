const Torneo = require('../models/torneo.model')

function crearTorneo(req, res) {
    var torneoModel = new Torneo();
    var parametros = req.body;
    var token = req.user

    if (token.rol == "ADMIN") {

        torneoModel.nombre = parametros.nombre;

        torneoModel.save((err, torneoGuardado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if (!torneoGuardado) return res.status(500).send({ mensaje: 'error al crear el torneo' })
            return res.status(200).send({ torneo: torneoGuardado })
        })
    } else {
        return res.status(500).send({ mensaje: 'no tiene los permisos para crear un torneo' })
    }
}

function editarTorneo(req, res) {
    var idTorneo = req.params.idTorneo;
    var parametros = req.body;
    var token = req.user

    if (token.rol == "ADMIN") {
        Torneo.findByIdAndUpdate(idTorneo, parametros, { new: true }, (err, torneoEditado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if (!torneoEditado) return res.status(404).send({ mensaje: 'error al editar el torneo' })

            return res.status(200).send({ torneo: torneoEditado })
        })
    } else {
        return res.status(500).send({ mensaje: 'no tiene los permisos para editar un torneo' })
    }
}

function eliminarTorneo(req, res) {
    var idTorneo = req.params.idTorneo;
    var token = req.user

    if (token.rol == "ADMIN") {
        Torneo.findByIdAndDelete({ _id: idTorneo }, (err, TorneoEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if (!TorneoEliminado) return res.status(500).send({ mensaje: 'error al eliminar el torneo' });

            return res.status(200).send({ TorneoEliminado: TorneoEliminado })
        })
    } else {
        return res.status(500).send({ mensaje: 'no tiene los permisos para eliminar un torneo' })
    }
}

function verTorneos(req, res) {
    var token = req.user

    if (token.rol == "ADMIN") {
        Torneo.find({}, (err, torneosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if (!torneosEncontrados) return res.status(404).send({ mensake: 'error al obtener los torneos' })
            return res.status(200).send({ torneos: torneosEncontrados })
        })
    } else {
        return res.status(500).send({ mensaje: 'no tiene los permisos para ver los torneos' })
    }
}

module.exports = {
    crearTorneo,
    verTorneos,
    editarTorneo,
    eliminarTorneo
}