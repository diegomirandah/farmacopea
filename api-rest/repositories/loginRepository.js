'use strict';
const mysql = require('../database/database');
const loginModel = require('../models/loginModel');
const usuarioModel = require('../models/usuarioModel');

module.exports = class {
	iniciarSesion(login){
		return new Promise( function(resolve, reject){
            mysql.query('SELECT u.*, l.log_email, l.log_tipo, l.log_token, l.log_expiracion FROM usuarios u, login l WHERE u.usr_id = (SELECT' 
            + ' l.usr_id WHERE l.log_contrasena=? AND (l.usr_id=? OR l.log_email=?))', [login.log_contrasena, login.usr_id, login.log_email] , (err, rows) => {
				if(!err && rows.length === 1){
					rows.map(row => {
						let usuario = new usuarioModel(row.usr_id, row.usr_nombre, row.usr_pais, row.usr_ocupacion, row.usr_empresa);
						let login = new loginModel(row.usr_id, row.log_email, row.log_contrasena, row.log_tipo, row.log_token, row.log_expiracion);
						resolve({login: login, usuario: usuario});
					});
				}else{
                    resolve(null);
				}
			});
		});
	}
	
	registrarse(login, usuario){
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

	cambiarContrasena(login){
		return (new Promise( function(resolve, reject){
			let sql = 'UPDATE login SET log_contrasena = ? WHERE usr_id = ?';
			let values = [login.log_contrasena, login.usr_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});							
				}else{
					reject(err);
				}
			});
		}));
	}

	recuperarContrasena(login){
		return (new Promise( function(resolve, reject){
			let sql = 'UPDATE login SET log_contrasena = ? WHERE log_email = ?';
			let values = [login.log_contrasena, login.log_email];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});							
				}else{
					reject(err);
				}
			});
		}));
	}
    
};