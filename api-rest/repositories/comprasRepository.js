'use strict';
const mysql = require('../database/database');
const usuarioModel = require('../models/usuarioModel');
const compraModel = require('../models/compraModel');
const planModel = require('../models/planModel');
module.exports = class {
	consultarCompras(){
		return new Promise( function(resolve, reject){
			let compras = [];
			mysql.query('SELECT * FROM compras c, usuarios u, planes p WHERE c.usr_id = u.usr_id AND c.plan_id = p.plan_id', (err, rows) => {
				if(!err){
					rows.map(row => {
						let usuario = new usuarioModel(row.usr_id, row.usr_nombre, row.usr_pais, row.usr_ocupacion, row.usr_empresa);
                        let compra = new compraModel(row.comp_id, row.comp_fecha_compra, row.comp_monto, row.comp_estado, row.usr_id, row.plan_id);
                        let plan = new planModel(row.plan_id, row.plan_nombre, row.plan_precio, row.plan_descripcion, plan_duracion);
                        compras.push({compra: compra, usuario: usuario, plan: plan});
					});
					resolve(compras);
				}else{
					reject();
				}
			});
		});
	}

	consultarComprasPorAnio(anio){
		return new Promise( function(resolve, reject){
			let sql = 'SELECT EXTRACT(MONTH FROM c.comp_fecha_compra) as mes, count(c.comp_fecha_compra) as n_compras FROM compras c WHERE EXTRACT(YEAR FROM c.comp_fecha_compra) = ? GROUP BY EXTRACT(MONTH FROM c.comp_fecha_compra)';
			mysql.query(sql, [anio], (err, rows) => {
				if(!err && rows.length > 0){
					resolve(rows);
				}else{
					reject();
				}
			});
		});
	}


	consultarPrimeraCompra(){
		return new Promise( function(resolve, reject){
			let sql = 'SELECT * FROM compras ORDER BY comp_fecha_compra ASC LIMIT 1';
			mysql.query(sql, (err, rows) => {
				if(!err && rows.length > 0){
					rows.map( row => {
						let compra = new compraModel(row.comp_id, row.comp_fecha_compra, row.comp_monto, row.comp_estado, row.usr_id, row.plan_id);
						resolve(compra);
					});
				}else{
					reject();
				}
			});
		});
	}

	consultarCompra(comp_id){
		return new Promise( function(resolve, reject){
			mysql.query('SELECT * FROM compras c WHERE c.comp_id = ?', [comp_id], (err, rows) => {
				if(!err && rows.length > 0){
					let compra = new compraModel(rows[0].comp_id, rows[0].comp_fecha_compra, rows[0].comp_monto, rows[0].comp_estado, rows[0].usr_id, rows[0].plan_id);
                    resolve(compra);
				}else{
					reject();
				}
			});
		});
	}

	consultarComprasCliente(usr_id){
		return new Promise( function(resolve, reject){
			mysql.query('SELECT * FROM compras c, usuarios u, planes p WHERE c.usr_id = u.usr_id AND c.plan_id = p.plan_id AND c.usr_id=?', [usr_id], (err, rows) => {
				if(!err && rows.length > 0){
					let compras = [];
					rows.map(row => {
						let compra = new compraModel(row.comp_id, row.comp_fecha_compra, row.comp_monto, row.comp_estado, row.usr_id, row.plan_id);
                        let plan = new planModel(row.plan_id, row.plan_nombre, row.plan_precio, row.plan_descripcion, row.plan_duracion);
						compras.push({compra: compra, plan: plan});
					});
					resolve(compras);
				}else{
					reject();
				}
			});
		});
	}

    actualizarEstadoCompra(compra){
        return (new Promise( function(resolve, reject){
			let sql = 'UPDATE compras SET comp_estado=? WHERE comp_id=?';
			let values = [compra.comp_estado, compra.comp_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});
				}else{
					reject(err);
				}
			});
		}));
	}
	
	realizarCompra(compra){
		return (new Promise( function(resolve, reject){
			let sql = 'INSERT INTO compras(comp_id, comp_fecha_compra, comp_monto, comp_estado, usr_id, plan_id) VALUES(?,?,?,?,?,?)';
			let values = [compra.comp_id, compra.comp_fecha_compra, compra.comp_monto, compra.comp_estado, compra.usr_id, compra.plan_id];
			mysql.query( sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows, insertId: rows.insertId});
				}else{
					reject(err);
				}
			});
		}));
	}	

}
