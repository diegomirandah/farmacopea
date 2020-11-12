'use strict';
const mysql = require('../database/database');
const planModel = require('../models/planModel');

module.exports = class {
	verPlanes(){
		return new Promise( function(resolve, reject){
			let planes = [];
			mysql.query('SELECT * FROM planes', (err, rows) => {
				if(!err){
					rows.map(row => {
						let plan = new planModel(row.plan_id, row.plan_nombre, row.plan_precio, row.plan_descripcion, row.plan_duracion);
						planes.push(plan);
					});
					resolve(planes);
				}else{
					reject(err);
				}
			});
		});
	}

	consultarPlan(plan_id){
		return new Promise( function(resolve, reject){
			mysql.query('SELECT * FROM planes WHERE plan_id = ?', [plan_id], (err, rows) => {
				if(!err && rows.length > 0){
					let plan = new planModel(rows[0].plan_id, rows[0].plan_nombre, rows[0].plan_precio, rows[0].plan_descripcion, rows[0].plan_duracion);
					resolve(plan);
					
				}else{
					reject();
				}
			});
		});
	}

	consultarPlanesContenido(cont_id){
		return new Promise( function(resolve, reject){
			let planes = [];
			mysql.query('SELECT * FROM contenidos_planes cp, planes pl WHERE cp.cont_id = ? AND cp.plan_id = pl.plan_id', [cont_id], (err, rows) => {
				if(!err){
					rows.map(row => {
						let plan = new planModel(row.plan_id, row.plan_nombre, row.plan_precio, row.plan_descripcion, row.plan_duracion);
						planes.push(plan);
					});
					resolve(planes);
				}else{
					reject(err);
				}
			});
		});
	}
	
	agregarPlan(plan){
		return new Promise( function(resolve, reject){
			let sql = 'INSERT INTO planes(plan_nombre, plan_precio, plan_descripcion, plan_duracion) VALUES(?,?,?,?)';
			let values = [plan.plan_nombre, plan.plan_precio, plan.plan_descripcion, plan.plan_duracion];
			mysql.query(sql, values, (err, rows) => {
				if(!err && rows.affectedRows > 0){
					resolve({affectedRows: rows.affectedRows});
				}else{
					reject(err);
				}
			});
		});
	}

	agregarContenidoPlan(contenido, plan){
		mysql.query('SELECT * FROM contenidos_planes WHERE cont_id = ? AND plan_id = ?', [contenido.cont_id, plan.plan_id], (err, rows) => {
			if(!err && rows.length > 0){
				console.log(rows.length);
				return new Promise( function(resolve, reject){resolve({affectedRows: rows.length})});
					
			}else{
				return new Promise( function(resolve, reject){
					let sql = 'INSERT INTO contenidos_planes(cont_id, plan_id) VALUES(?,?)';
					let values = [contenido.cont_id, plan.plan_id];
					mysql.query(sql, values, (err, rows) => {
						if(!err && rows.affectedRows > 0){
							resolve({affectedRows: rows.affectedRows});
						}else{
							reject(err);
						}
					});
				});
			}
		});	
		
	}

	quitarContenidoPlan(contenido, plan){
		return new Promise( function(resolve, reject){
			let sql = 'DELETE FROM contenidos_planes WHERE cont_id = ? AND plan_id = ?';
			let values = [contenido.cont_id, plan.plan_id];
			mysql.query(sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});
				}else{
					reject(err);
				}
			});
		});
	}
	
	
	actualizarPlan(plan){
		return new Promise( function(resolve, reject){
			let sql = 'UPDATE planes SET plan_nombre=?, plan_precio=?, plan_descripcion=?, plan_duracion=? WHERE plan_id=?';
			let values = [plan.plan_nombre, plan.plan_precio, plan.plan_descripcion, plan.plan_duracion, plan.plan_id];
			mysql.query(sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});
				}else{
					reject(err);
				}
			});
		});
	}
	
	eliminarPlan(plan_id){
		return new Promise( function(resolve, reject){
			mysql.query('DELETE FROM planes WHERE plan_id=?', [plan_id], (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});
				}else{
					reject(err);
				}
			});
		});
    }
    
};