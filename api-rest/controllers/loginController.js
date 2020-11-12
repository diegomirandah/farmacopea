/*LOGIN CONTROLLER
Controla los datos enviados por cada petición, llamando al caso de uso
correspondiente, el que a través del repositorio gestiona los datos que
son devueltos por este. Posteriormente el controlador se encarga de
retornar datos y estados de las peticiones al cliente.
*/

'use strict';
const reply = require('../utils/reply');
var config = require('../config');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
 
/*Repositorios*/ 
const loginRepository = require('../repositories/loginRepository');
const loginRepo = new loginRepository();
const licenciasRepository = require('../repositories/licenciasRepository');
const licenciasRepo = new licenciasRepository();

/*Casos de uso*/
const iniciarSesion = require('../use_cases/iniciarSesion');
const registrarse = require('../use_cases/registrarse');
const cambiarContrasena = require('../use_cases/cambiarContrasena');
const recuperarContrasena = require('../use_cases/recuperarContrasena');
const comprobarLicenciasUsuario = require('../use_cases/comprobarLicenciasUsuario');

/*Modelos*/
const loginModel = require('../models/loginModel');
const usuarioModel = require('../models/usuarioModel');

module.exports = {
	async iniciarSesion(req, res){
		try{
            let body = req.body;
            /*Se toma log_email en caso de ser numero de documento o correo electronico*/
            const hash = crypto.createHmac('sha256', config.secret).update(body.log_contrasena).digest('hex');
            let login = new loginModel(body.log_email, body.log_email, hash, null, null, null);
            if(!login.log_email || !login.log_contrasena){
                res.json(reply.error(400,'Faltan datos de entrada.'));
                return null;
            }
            const resp = await iniciarSesion(login, {loginRepo});
            if(!resp){
                res.json(reply.error(404,'Usuario y/o contraseña no válido.'));
                return;
            }

            await comprobarLicenciasUsuario(resp.usuario.usr_id, {licenciasRepo});
            /*1440*/
            const token = jwt.sign(resp, config.secret, { expiresIn: config.tokenExpiration });
            res.json(reply.ok(200,token, 'Sesión iniciada correctamente.'));      
		}catch(err){
			res.json(reply.error(400,err));
		}
    },

    async registrarse(req, res){
        try{
            let usr = req.body.usuario;
            let log = req.body.login;

            if(!usr || !log){
                res.json(reply.error(400,'Faltan datos de entrada.'));
                return null;
            }
            
            let usuario = new usuarioModel(usr.usr_id, usr.usr_nombre, usr.usr_pais, usr.usr_ocupacion, usr.usr_empresa);
            const hash = crypto.createHmac('sha256', config.secret).update(log.log_contrasena).digest('hex');
            let login = new loginModel(log.usr_id, log.log_email, hash, 'cliente', ' ', ' ');
            /*Comprobar entrada de datos*/
			if(!usuario.usr_nombre || !usuario.usr_pais || !usuario.usr_ocupacion || !usuario.usr_empresa){
				res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada del usuario.'});
				return null;
			}

			if(!login.usr_id || !login.log_email || !login.log_contrasena || !login.log_tipo || !login.log_token || !login.log_expiracion){
				res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada del login.'});
				return null;
			}
            const resp = await registrarse(login, usuario, {loginRepo});
			res.json(reply.ok(200,null,'Se ha registrado con éxito.'));
        }catch(err){
            if(err.code == 'ER_DUP_ENTRY'){
				res.json(reply.error(500,'El usuario se encuentra registrado.'));
				return null;
			}
			res.json(reply.fatal(500,err));
        }
    },

    async cambiarContrasena(req, res){
		try{
            let body = req.body;
            /*Se toma log_email en caso de ser numero de documento o correo electronico*/
            const hash = crypto.createHmac('sha256', config.secret).update(body.log_contrasena).digest('hex');
            let login = new loginModel(body.usr_id, null, hash, null, null, null);
            if(!login.usr_id || !login.log_contrasena){
                res.json(reply.error(400,'Faltan datos de entrada.'));
                return null;
            }
            const resp = await cambiarContrasena(login, {loginRepo});
            if(!resp.affectedRows){
                res.json(reply.error(400,'No se ha modificado la contraseña.'));
                return;
            }
            res.json(reply.ok(200,null, 'Contraseña modificada con éxito.'));      
		}catch(err){
			res.json(reply.error(400,err));
		}
    },

    async recuperarContrasena(req, res){
		try{
            let log_email = req.body.log_email;
            
            let log_contrasena = randomstring.generate(10);

            const hash = crypto.createHmac('sha256', config.secret).update(log_contrasena).digest('hex');
        
            let login = new loginModel(null, log_email, hash, null, null, null);
            if(!login.log_email || !login.log_contrasena){
                res.json(reply.error(400,'Faltan datos de entrada.'));
                return null;
            }
            const resp = await recuperarContrasena(login, {loginRepo});
            if(!resp.affectedRows){
                res.json(reply.error(400,'No se ha podido recuperar la contraseña.'));
                return;
            }

            /*Enviar correo nodemailer*/

            if(config.mail.enabled){
                var transporter = nodemailer.createTransport(config.mail);
            
                var mailOptions = {
                    from: 'Remitente',
                    to: log_email,
                    subject: 'Farmacopea Chilena, restablecer contraseña',
                    html: '<h3>Estimado/a</h3><p>Se ha solicitado restablecer la contraseña de su cuenta. Para ello se ha generado la siguiente contraseña con la que podrá '+
                    'acceder a su cuenta.</p><p>'+log_contrasena+'</p><br/><p>Si usted no solicitó cambiar su contraseña sugerimos cambiarla por una nueva. Si el problema persiste contáctenos</p>'
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error){
                        console.log(error);
                        res.json(reply.error(400,error.message));
                    } else {
                        res.json(reply.ok(200,null, 'Email enviado.'));
                    }
                });
            }else{
                res.json(reply.ok(200,null, 'Email enviado.'));
            }

		}catch(err){
			res.json(reply.error(400,err));
		}
    }

};	