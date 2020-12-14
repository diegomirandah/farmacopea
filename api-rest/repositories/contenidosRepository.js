'use strict';
const mysql = require('../database/database');
const contenidoModel = require('../models/contenidoModel');
const cambioModel = require('../models/cambioModel');
const loginModel = require('../models/loginModel');

module.exports = class {

	verCambiosContenidos(){
		return new Promise( function(resolve, reject){
			let contenidos = [];
			mysql.query('SELECT l.usr_id, l.log_email, l.log_tipo, c.cam_id, c.cam_fecha_modificacion, c.cam_nombre, c.cam_descripcion, c.cont_id, c.usr_id FROM cambios c, login l WHERE l.usr_id = c.usr_id ORDER BY c.cam_fecha_modificacion ASC', (err, rows) => {
				if(!err){
					rows.map(row => {
						let cambio = new cambioModel(row.cam_id, row.cam_fecha_modificacion, row.cam_nombre, row.cam_descripcion, row.cont_id, row.usr_id);
						let login = new loginModel(row.usr_id, row.log_email, null, row.log_tipo, null, null);
						contenidos.push({cambio: cambio, login: login});
					});
					resolve(contenidos);
				}else{
					reject();
				}
			});
		});
	}

	comprobarContenidoPlan(cont_id, plan_id){
		return new Promise( function(resolve, reject){
			let contenidos = [];
			mysql.query('SELECT cp_id FROM contenidos_planes WHERE cont_id = ? AND plan_id = ?', [cont_id, plan_id], (err, rows) => {
				if(!err){
					if(rows.length > 0)
						resolve(true);
					else
						resolve(false);
				}else{
					reject();
				}
			});
		});
	}
	
	consultarContenidos(){
		return new Promise( function(resolve, reject){
			let contenidos = [];
			mysql.query('SELECT * FROM contenidos ORDER BY cont_nombre ASC', (err, rows) => {
				if(!err){
					rows.map(row => {
						let contenido = new contenidoModel(row.cont_id, row.cont_fecha_creacion, row.cont_nombre, row.cont_descripcion, row.cont_tipo);
						contenidos.push(contenido);
					});
					resolve(contenidos);
				}else{
					reject();
				}
			});
		});
    }

    buscarContenido(cont_nombre){
		return new Promise( function(resolve, reject){
            let contenidos = [];
            mysql.query('SELECT * FROM contenidos WHERE (INSTR(cont_nombre,?) > 0) ORDER BY cont_nombre ASC', [cont_nombre], (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						let contenido = new contenidoModel(row.cont_id, row.cont_fecha_creacion, row.cont_nombre, row.cont_descripcion, row.cont_tipo);
						contenidos.push(contenido);
					});
					resolve(contenidos);
				}else{
					reject();
				}
			});
		});
	}

	consultarTiposContenidos(){
		return new Promise( function(resolve, reject){
            let tipos = [];
            mysql.query('SELECT cont_tipo FROM contenidos GROUP BY cont_tipo ORDER BY cont_tipo ASC', (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						tipos.push(row.cont_tipo);
					});
					resolve(tipos);
				}else{
					reject();
				}
			});
		});
	}

	consultarTiposContenidosPorPlan(plan_id){
		return new Promise( function(resolve, reject){
            let tipos = [];
            mysql.query('SELECT * FROM contenidos c, contenidos_planes cp WHERE c.cont_id = cp.cont_id AND cp.plan_id = ? GROUP BY c.cont_tipo ORDER BY c.cont_nombre ASC', [plan_id], (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						tipos.push(row.cont_tipo);
					});
					resolve(tipos);
				}else{
					reject();
				}
			});
		});
	}

	consultarContenidosPorTipo(cont_tipo){
		return new Promise( function(resolve, reject){
            let contenidos = [];
            mysql.query('SELECT cont_id, cont_nombre FROM contenidos WHERE cont_tipo =? ORDER BY cont_nombre ASC', [cont_tipo], (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						let contenido = new contenidoModel(row.cont_id, row.cont_fecha_creacion, row.cont_nombre, row.cont_descripcion, row.cont_tipo);
						contenidos.push(contenido);
					});
					resolve(contenidos);
				}else{
					reject();
				}
			});
		});
	}

	consultarContenidosPorTipoYPlan(cont_tipo, plan_id){
		return new Promise( function(resolve, reject){
            let contenidos = [];
            mysql.query('SELECT c.cont_id, c.cont_nombre FROM contenidos c, contenidos_planes cp WHERE c.cont_id = cp.cont_id AND c.cont_tipo = ? AND cp.plan_id =? ORDER BY c.cont_nombre ASC', [cont_tipo, plan_id], (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						let contenido = new contenidoModel(row.cont_id, row.cont_fecha_creacion, row.cont_nombre, row.cont_descripcion, row.cont_tipo);
						contenidos.push(contenido);
					});
					resolve(contenidos);
				}else{
					reject();
				}
			});
		});
	}

	consultarContenidoPorId(cont_id){
		return new Promise( function(resolve, reject){
			/*Consultar contenido e imagenes*/
            mysql.query('SELECT * FROM contenidos WHERE cont_id = ?', [cont_id], (err, rows) => {
				if(!err && rows.length === 1){
					rows.map(row => {
						let contenido = new contenidoModel(row.cont_id, row.cont_fecha_creacion, row.cont_nombre, row.cont_descripcion, row.cont_tipo);
						resolve(contenido);
					});
				}else{
					reject();
				}
			});
		});
	}

	consultarContenidoPorNombre(cont_nombre){
		return new Promise( function(resolve, reject){
			/*Consultar contenido e imagenes*/
            mysql.query('SELECT * FROM contenidos WHERE cont_nombre = ?', [cont_nombre], (err, rows) => {
				if(!err && rows.length === 1){
					rows.map(row => {
						let contenido = new contenidoModel(row.cont_id, row.cont_fecha_creacion, row.cont_nombre, row.cont_descripcion, row.cont_tipo);
						resolve(contenido);
					});
				}else{
					reject();
				}
			});
		});
	}

	consultarContenidosPlan(plan_id){
		return new Promise( function(resolve, reject){
            let contenidos = [];
            mysql.query('SELECT * FROM contenidos c, contenidos_planes cp WHERE c.cont_id = cp.cont_id AND cp.plan_id=? ORDER BY c.cont_nombre ASC', [plan_id], (err, rows) => {
				if(!err && rows.length > 0){
					rows.map(row => {
						let contenido = new contenidoModel(row.cont_id, row.cont_fecha_creacion, row.cont_nombre, row.cont_descripcion, row.cont_tipo);
						contenidos.push(contenido);
					});
					resolve(contenidos);
				}else{
					reject();
				}
			});
		});
	}

	agregarContenido(contenido){
		return (new Promise( function(resolve, reject){
			let sql = 'INSERT INTO contenidos(cont_nombre, cont_fecha_creacion, cont_descripcion, cont_tipo) VALUES(?,?,?,?)';
			let values = [contenido.cont_nombre, contenido.cont_fecha_creacion, contenido.cont_descripcion, contenido.cont_tipo];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows, insertId: rows.insertId});							
				}else{
					reject(err);
				}
			});
		}));
	}

	actualizarContenido(contenido){
		return (new Promise( function(resolve, reject){
			let sql = 'UPDATE contenidos SET cont_nombre=?, cont_descripcion=?, cont_tipo=? WHERE cont_id=?';
			let values = [contenido.cont_nombre, contenido.cont_descripcion, contenido.cont_tipo, contenido.cont_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});							
				}else{
					reject(err);
				}
			});
		}));
	}

	registrarCambiosContenido(cambio){
		return (new Promise( function(resolve, reject){
			let sql = 'INSERT INTO cambios (cam_fecha_modificacion, cam_nombre, cam_descripcion, cont_id, usr_id) VALUES(?,?,?,?,?)';
			let values = [cambio.cam_fecha_modificacion, cambio.cam_nombre, cambio.cam_descripcion, cambio.cont_id, cambio.usr_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});							
				}else{
					reject(err);
				}
			});
		}));
	}

	eliminarContenido(cont_id){
		return (new Promise( function(resolve, reject){
			let sql = 'DELETE FROM contenidos WHERE cont_id=?';
			let values = [cont_id];
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