'use strict';
const mysql = require('../database/database');
const usuarioModel = require('../models/usuarioModel');
const loginModel = require('../models/loginModel');
module.exports = class {
	consultarUsuarios(){
		return new Promise( function(resolve, reject){
			let usuarios = [];
			mysql.query('SELECT u.*,l.log_email, l.log_tipo,l.log_token, l.log_expiracion FROM usuarios u, login l WHERE u.usr_id = l.usr_id', (err, rows) => {
				if(!err){
					rows.map(row => {
						let usuario = new usuarioModel(row.usr_id, row.usr_nombre, row.usr_pais, row.usr_ocupacion, row.usr_empresa);
						let login = new loginModel(row.usr_id, row.log_email, row.log_contrasena, row.log_tipo, row.log_token, row.log_expiracion);
						usuarios.push({login: login, usuario: usuario});
					});
					resolve(usuarios);
				}else{
					reject();
				}
			});
		});
	}

	buscarUsuario(usr_id){
		return new Promise( function(resolve, reject){
			mysql.query('SELECT u.*,l.log_email, l.log_tipo,l.log_token, l.log_expiracion FROM usuarios u, login l WHERE u.usr_id = l.usr_id AND l.usr_id=?', [usr_id], (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						let usuario = new usuarioModel(row.usr_id, row.usr_nombre, row.usr_pais, row.usr_ocupacion, row.usr_empresa);
						let login = new loginModel(row.usr_id, row.log_email, row.log_contrasena, row.log_tipo, row.log_token, row.log_expiracion);
						resolve({login: login, usuario: usuario});
					});
				}else{
					reject();
				}
			});
		});
	}

	coincidenciaUsuario(usr_id){
		return new Promise( function(resolve, reject){
			let sql = "SELECT u.*,l.log_email, l.log_tipo,l.log_token, l.log_expiracion FROM usuarios u, login l WHERE u.usr_id = l.usr_id AND (l.usr_id = '"+usr_id+"' OR u.usr_nombre LIKE '%"+usr_id+"%' OR l.log_email LIKE '"+usr_id+"%')";
			mysql.query(sql, (err, rows) => {
				if(!err && rows.length > 0){
					let usuarios = [];
					rows.map(row => {
						let usuario = new usuarioModel(row.usr_id, row.usr_nombre, row.usr_pais, row.usr_ocupacion, row.usr_empresa);
						let login = new loginModel(row.usr_id, row.log_email, row.log_contrasena, row.log_tipo, row.log_token, row.log_expiracion);
						usuarios.push({login: login, usuario: usuario});
					});
					resolve(usuarios);
					
				}else{
					reject();
				}
			});
		});
	}

	crearUsuario(login, usuario){
		return (new Promise( function(resolve, reject){
			let sql = 'INSERT INTO login(usr_id, log_email, log_contrasena, log_tipo, log_token, log_expiracion) VALUES(?,?,?,?,?,?)';
			let values = [login.usr_id, login.log_email, login.log_contrasena, login.log_tipo, login.log_token, login.log_expiracion];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					let sql = 'INSERT INTO usuarios(usr_id, usr_nombre, usr_pais, usr_ocupacion, usr_empresa) VALUES(?,?,?,?,?)';
					let values = [usuario.usr_id, usuario.usr_nombre, usuario.usr_pais, usuario.usr_ocupacion, usuario.usr_empresa];
					mysql.query( sql, values, (err, rows) => {
						if(!err){
							resolve({affectedRows: rows.affectedRows});							
						}else{
							reject(err);
						}
					});
				}else{
					reject(err);
				}
			});
		}));
	}

	actualizarDatosUsuario(login, usuario){
		return (new Promise( function(resolve, reject){
			let sql = 'UPDATE login SET log_email = ? WHERE usr_id  = ?';
			let values = [login.log_email, login.usr_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					let sql = 'UPDATE usuarios SET usr_nombre = ?, usr_pais = ?, usr_ocupacion = ?, usr_empresa = ? WHERE usr_id = ?';
					let values = [usuario.usr_nombre, usuario.usr_pais, usuario.usr_ocupacion, usuario.usr_empresa, usuario.usr_id];
					mysql.query( sql, values, (err, rows) => {
						if(!err){
							resolve({affectedRows: rows.affectedRows});							
						}else{
							reject(err);
						}
					});
				}else{
					reject(err);
				}
			});
		}));
	}

	modificarTipoUsuario(login){
		return (new Promise( function(resolve, reject){
			let sql = 'UPDATE login SET log_tipo=? WHERE usr_id=?';
			let values = [login.log_tipo, login.usr_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});							
				}else{
					reject(err);
				}
			});
		}));
	}

	eliminarUsuario(usr_id){
		return (new Promise( function(resolve, reject){
			let sql = 'DELETE FROM login WHERE usr_id=?';
			let values = [usr_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});
				}else{
					reject(err);
				}
			});
		}));
	}

	

}
