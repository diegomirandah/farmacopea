/*USUARIOS CONTROLLER
Controla los datos enviados por cada petición, llamando al caso de uso
correspondiente, el que a través del repositorio gestiona los datos que
son devueltos por este. Posteriormente el controlador se encarga de
retornar datos y estados de las peticiones al cliente.
*/

'use strict';
const reply = require('../utils/reply');
const crypto = require('crypto');
var config = require('../config');

/*Repositorios*/ 
const UsuariosRepository = require('../repositories/usuariosRepository');
const usuariosrepo = new UsuariosRepository();

/*Casos de uso*/
const crearUsuario = require('../use_cases/crearUsuario');
const consultarUsuarios = require('../use_cases/consultarUsuarios');
const modificarTipoUsuario = require('../use_cases/modificarTipoUsuario');
const eliminarUsuario = require('../use_cases/eliminarUsuario');
const buscarUsuario = require('../use_cases/buscarUsuario');
const coincidenciaUsuario = require('../use_cases/coincidenciaUsuario');
const actualizarDatosUsuario = require('../use_cases/actualizarDatosUsuario');

/*Modelos*/
const usuarioModel = require('../models/usuarioModel');
const loginModel = require('../models/loginModel');


module.exports = {
	/* CONSULTAR USUARIOS
	Consulta todos los usuarios y entrega 
	modelos del usuario y del login
	*/
	async consultarUsuarios(req, res){
		try{
			const resp = await consultarUsuarios({usuariosrepo});
			if(resp.length > 0)
				res.json(reply.ok(200,resp));
			else
				res.json(reply.ok(201,null,'No se han encontrado usuarios.'));
		}catch(err){
			res.json(reply.ok(201,err));
		}
	},
	
	/* BUSCAR USUARIO
	Busca un usuario por número de documento
	Retorna información de login y usuario si 
	se encuentra, y si no retorna mensaje no 
	encontrado.
	*/
	async buscarUsuario(req, res){
		try{
			const resp = await buscarUsuario(req.params.usr_id, {usuariosrepo});
			res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.error(404,'No se encontró el usuario.'));
		}
	},

	/* BUSCAR COINCIDENCIA
	Busca un usuario por número de documento
	Retorna información de login y usuario si 
	se encuentra, y si no retorna mensaje no 
	encontrado.
	*/
	async coincidenciaUsuario(req, res){
		try{
			const resp = await coincidenciaUsuario(req.body.usr_id, {usuariosrepo});
			res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.error(404,'No se encontró el usuario.'));
		}
	},

	/*CREAR USUARIO
	Recibe información de login y datos del
	usuario y lo guarda. Retorna estado de
	la creación
	*/
	async crearUsuario(req, res){
		try{
			let usr = req.body.usuario;
            let log = req.body.login;
			if(!usr || !log){
                res.json(reply.error(400,'Faltan usuario o login.'));
                return null;
            }
			let usuario = new usuarioModel(usr.usr_id, usr.usr_nombre, usr.usr_pais, usr.usr_ocupacion, usr.usr_empresa);
			const hash = crypto.createHmac('sha256', config.secret).update(log.log_contrasena).digest('hex');
			let login = new loginModel(usr.usr_id, log.log_email, hash, log.log_tipo, null , null);
			/*Comprobar entrada de datos*/
			if(!usuario.usr_id || !usuario.usr_nombre){
				res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada.'});
				return null;
			}

			if(!login.usr_id || !login.log_email || !login.log_contrasena || !login.log_tipo){
				res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada.'});
				return null;
			}

			const resp = await crearUsuario(login, usuario, {usuariosrepo});
			res.json(reply.ok(200,null,'Usuario creado con éxito.'));
		}catch(err){
			if(err.code == 'ER_DUP_ENTRY'){
				res.json(reply.error(500,'El usuario se encuentra registrado.'));
				return null;
			}
			res.json(reply.fatal(500,err));
		}
	},

	/*ACTUALIZAR DATOS USUARIO
	Recibe información de login y datos del
	usuario y lo modifica. Retorna estado de
	la modificación
	*/
	async actualizarDatosUsuario(req, res){
		try{
			let usr = req.body.usuario;
            let log = req.body.login;
			if(!usr || !log){
                res.json(reply.error(400,'Faltan usuario o login.'));
                return null;
            }
			let usuario = new usuarioModel(usr.usr_id, usr.usr_nombre, usr.usr_pais, usr.usr_ocupacion, usr.usr_empresa);
			let login = new loginModel(usr.usr_id, log.log_email, null, null, null , null);
			/*Comprobar entrada de datos*/
			if(!usuario.usr_id || !usuario.usr_nombre){
				res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada.'});
				return null;
			}

			if(!login.usr_id || !login.log_email){
				res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada.'});
				return null;
			}

			const resp = await actualizarDatosUsuario(login, usuario, {usuariosrepo});
			res.json(reply.ok(200,null,'Cambios realizados con éxito.'));
		}catch(err){
			res.json(reply.fatal(500,err));
		}
	},

	/*MODIFICAR TIPO USUARIO
	Cambia permisos de un usuario indicando
	su número de documento. Retorna estado
	de los cambios.
	*/ 
	async modificarTipoUsuario(req, res){
		try{
			let login = new loginModel(req.params.usr_id, null, null, req.body.log_tipo, null, null);
			/*Comprobar entrada de datos*/
			if(!login.usr_id || !login.log_tipo){
				res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada.'});
				return null;
			}
			const resp = await modificarTipoUsuario(login, {usuariosrepo}); 
			if(resp.affectedRows > 0){
				res.json(reply.ok(200,null,'Tipo de usuario modificado con éxito.'));
			}else{
				res.json(reply.error(400,'No se han realizado cambios.'));
			}
		}catch(err){
			res.json(reply.fatal(500,err.code));
		}
	},

	/*ELIMINAR USUARIO
	Elimina un usuario del sistema según su
	número de documento. Retorna el estado
	de la solicitud.
	*/
	async eliminarUsuario(req, res){
		try{
			let usr_id = req.params.usr_id;
			if(!usr_id){
				res.json(reply.error(400,'Faltan datos de entrada.'));
				return null;
			}
			const resp = await eliminarUsuario(usr_id , {usuariosrepo});
			if(resp.affectedRows > 0){
				res.json(reply.ok(200,null,'Usuario eliminado con éxito.'));
			}else{
				res.json(reply.error(400,'No se ha encontrado el usuario.'));
			}
		}catch(err){
			res.json(reply.fatal(500,err.code));
		}
	}

};
