const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');



function UsuarioDefault(req, res) {
    var modeloUsuario = new Usuario();
    Usuario.find({ email: "ADMIN@gmail.com", nombre: "ADMIN" }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            console.log({ mensaje: "ya se ha creado el usuario del Administrador" })
        } else {
            modeloUsuario.nombre = "ADMIN";
            modeloUsuario.email = "ADMIN@gmail.com";
            modeloUsuario.password = "deportes123";
            modeloUsuario.rol = "ADMIN";
            bcrypt.hash(modeloUsuario.password, null, null, (err, passwordEncryptada) => {
                modeloUsuario.password = passwordEncryptada
                modeloUsuario.save((err, usuarioGuardado) => {
                    if (err) console.log({ mensaje: 'error en la peticion ' })
                    if (!usuarioGuardado) console.log({ mensaje: 'error al crear usuario por defecto ' })
                    console.log({ Usuario: usuarioGuardado })

                })
            })
        }
    })

}
function Login(req, res) {
    var parametros = req.body;

    Usuario.findOne({ email: parametros.email }, (err, usuarioencontrado) => {
        if (err) return res.status(500).send({ mensaje: 'error en la peticion ' });
        if (usuarioencontrado) {
            bcrypt.compare(parametros.password, usuarioencontrado.password, (err, Verificaciondepasswor) => {
                if (Verificaciondepasswor) {
                    if (parametros.obtenerToken == 'true') {
                        return res.status(200).send({ token: jwt.crearToken(usuarioencontrado) })
                    } else {
                        usuarioencontrado.password = undefined;
                        return res.status(200).send({ usuario: usuarioencontrado })
                    }
                } else {
                    return res.status(500).send({ mensaje: 'la contraseña no coincide' })
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'El usuario nose ha podido identificar' })
        }
    })
}

function nuevoAdmin(req, res) {
    var modeloUsuario = new Usuario();
    var parametros = req.body;
    var token = req.user

    if (token.rol = "ADMIN") {
        modeloUsuario.nombre = parametros.nombre
        modeloUsuario.email = parametros.nombre + "@gmail.com"
        modeloUsuario.password = parametros.password    
        modeloUsuario.rol = "ADMIN"

        bcrypt.hash(parametros.password, null, null, (err, passwordEncryptada) => {
            modeloUsuario.password = passwordEncryptada
            modeloUsuario.save((err, usuarioGuardado) => {
                if (err) res.status(500).send({ mensaje: 'error en la peticion ' })
                if (!usuarioGuardado) res.status(404).send({ mensaje: 'error al crear usuario por defecto ' })
                return res.status(200).send({ Usuario: usuarioGuardado })
            })
        })
    }else {
        return res.status(500).send({ mensaje: "no puede crear un administrador"})
    }
}

function registrar(req, res) {
    var modeloUsuario = new Usuario();
    var parametros = req.body;

        modeloUsuario.nombre = parametros.nombre
        modeloUsuario.email = parametros.nombre + "@gmail.com"
        modeloUsuario.password = parametros.password    
        modeloUsuario.rol = "user" 

        bcrypt.hash(parametros.password, null, null, (err, passwordEncryptada) => {
            modeloUsuario.password = passwordEncryptada
            modeloUsuario.save((err, usuarioGuardado) => {
                if (err) res.status(500).send({ mensaje: 'error en la peticion ' })
                if (!usuarioGuardado) res.status(404).send({ mensaje: 'error al crear usuario por defecto ' })
                return res.status(200).send({ Usuario: usuarioGuardado })
            })
        })  
}

module.exports = {
    UsuarioDefault,
    Login,
    nuevoAdmin,
    registrar,
    
}