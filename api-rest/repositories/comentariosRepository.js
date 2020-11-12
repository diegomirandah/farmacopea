'use strict';
const mysql = require('../database/database');
const comentarioModel = require('../models/comentarioModel');
const contenidoModel = require('../models/contenidoModel');
const loginModel = require('../models/loginModel');
const usuarioModel = require('../models/usuarioModel');
module.exports = class {

	consultarComentarios(){
		return new Promise( function(resolve, reject){
            let comentarios = [];
            mysql.query('SELECT c.* , u.*, l.*, co.cont_nombre, co.cont_tipo FROM comentarios c, usuarios u, login l, contenidos co WHERE c.usr_id = u.usr_id AND c.usr_id = l.usr_id AND c.cont_id = co.cont_id',  (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						let comentario = new comentarioModel(row.com_id, row.com_fecha_creacion, row.com_comentario, row.com_estado, row.usr_id, row.cont_id);
						let usuario = new usuarioModel(row.usr_id, row.usr_nombre, row.usr_pais, row.usr_ocupacion, row.usr_empresa);
						let login = new loginModel(row.usr_id, row.log_email, null, row.log_tipo, row.log_token, row.log_expiracion);
						let contenido = new contenidoModel(null, null, row.cont_nombre, null, row.cont_tipo);
						comentarios.push({comentario: comentario, usuario: usuario, login: login, contenido: contenido});
					});
					resolve(comentarios);
				}else{
					reject();
				}
			});
		});
	}

	consultarComentariosPorEstado(com_estado){
		return new Promise( function(resolve, reject){
            let comentarios = [];
            mysql.query('SELECT c.*, u.*, l.*, co.cont_nombre, co.cont_tipo FROM comentarios c, usuarios u, login l, contenidos co WHERE c.usr_id = u.usr_id AND c.usr_id = l.usr_id AND c.cont_id = co.cont_id AND c.com_estado = ?', [com_estado], (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						let comentario = new comentarioModel(row.com_id, row.com_fecha_creacion, row.com_comentario, row.com_estado, row.usr_id, row.cont_id);
						let usuario = new usuarioModel(row.usr_id, row.usr_nombre, row.usr_pais, row.usr_ocupacion, row.usr_empresa);
						let login = new loginModel(row.usr_id, row.log_email, null, row.log_tipo, row.log_token, row.log_expiracion);
						let contenido = new contenidoModel(null, null, row.cont_nombre, null, row.cont_tipo);
						comentarios.push({comentario: comentario, usuario: usuario, login: login, contenido: contenido});
					});
					resolve(comentarios);
				}else{
					reject();
				}
			});
		});
	}

    comentariosContenido(cont_id){
		return new Promise( function(resolve, reject){
            let comentarios = [];
            mysql.query('SELECT * FROM comentarios c, usuarios u WHERE c.usr_id = u.usr_id AND c.cont_id = ?', [cont_id], (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						let comentario = new comentarioModel(row.com_id, row.com_fecha_creacion, row.com_comentario, row.com_estado, row.usr_id, row.cont_id);
						let usuario = new usuarioModel(row.usr_id, row.usr_nombre, row.usr_pais, row.usr_ocupacion, row.usr_empresa);
						comentarios.push({comentario: comentario, usuario: usuario});
					});
					resolve(comentarios);
				}else{
					reject();
				}
			});
		});
	}

	marcarComentarioComoVisto(com_id){
		return (new Promise( function(resolve, reject){
			let sql = "UPDATE comentarios SET com_estado = 'aceptado' WHERE com_id = ?";
			let values = [com_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});							
				}else{
					reject(err);
				}
			});
		}));
	}

	comentarMonografia(comentario){
		return (new Promise( function(resolve, reject){
			let sql = 'INSERT INTO comentarios(com_fecha_creacion, com_comentario, com_estado, usr_id, cont_id) VALUES(?,?,?,?,?)';
			let values = [comentario.com_fecha_creacion, comentario.com_comentario, comentario.com_estado, comentario.usr_id, comentario.cont_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});							
				}else{
					reject(err);
				}
			});
		}));
	}

	eliminarComentario(com_id){
		return (new Promise( function(resolve, reject){
			let sql = 'DELETE FROM comentarios WHERE com_id=?';
			let values = [com_id];
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