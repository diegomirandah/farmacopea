'use strict';
const mysql = require('../database/database');
const licenciaModel = require('../models/licenciaModel');
const planModel = require('../models/planModel');
const loginModel = require('../models/loginModel');
const usuarioModel = require('../models/usuarioModel');

module.exports = class {
	consultarLicencias(){
		return new Promise( function(resolve, reject){
			let licencias = [];
            mysql.query('SELECT lic.*, pl.*, usr.*, log.log_email FROM licencias lic, login log, usuarios usr, planes pl ' 
            + 'WHERE lic.usr_id = log.usr_id AND lic.usr_id = usr.usr_id AND pl.plan_id = lic.plan_id', (err, rows) => {
				if(!err){
					rows.map(row => {
						let licencia = new licenciaModel(row.lic_id, row.lic_fecha_creacion, row.lic_fecha_expiracion, row.lic_estado, row.usr_id, row.plan_id);
                        let plan = new planModel(row.plan_id, row.plan_nombre, row.plan_precio, row.plan_descripcion, row.plan_duracion);
                        let login = new loginModel(row.usr_id, row.log_email, null, null, null, null);
                        let usuario = new usuarioModel(row.usr_id, row.usr_nombre, row.usr_pais, row.usr_ocupacion, row.usr_empresa);
                        licencias.push({
                            licencia: licencia,
                            plan: plan,
                            login: login,
                            usuario: usuario
                        });
					});
					resolve(licencias);
				}else{
					reject();
				}
			});
		});
	}

	consultarEstadoLicencias(){
		return new Promise( function(resolve, reject){
			mysql.query('SELECT l.lic_estado, COUNT(l.lic_estado) as n_licencias FROM licencias l GROUP BY l.lic_estado', (err, rows) => {
				if(!err && rows.length > 0){
					resolve(rows);
				}else{
					reject();
				}
			});
		});
	}

	buscarLicencia(lic_id){
		return new Promise( function(resolve, reject){
			mysql.query('SELECT * FROM licencias WHERE lic_id = ?', [lic_id], (err, rows) => {
				if(!err && rows.length > 0){
					let licencia = new licenciaModel(rows[0].lic_id, rows[0].lic_fecha_creacion, rows[0].lic_fecha_expiracion, rows[0].lic_estado, rows[0].usr_id, rows[0].plan_id);
					resolve(licencia);
				}else{
					reject();
				}
			});
		});
	}


	comprobarLicenciasUsuario(usr_id){
		return new Promise( function(resolve, reject){
			mysql.query('SELECT * FROM licencias WHERE usr_id = ?', [usr_id], (err, rows) => {
				if(!err && rows.length > 0){
					//console.log(rows);
					rows.forEach( licencia => {
						let fechaActual = new Date();
						let fechaLicencia = new Date(licencia.lic_fecha_expiracion)
						if((fechaActual.getTime() > fechaLicencia.getTime()) && (licencia.lic_estado === 'activa' || licencia.lic_estado === 'suspendida')){
							mysql.query("UPDATE licencias SET lic_estado = 'vencida' WHERE lic_id = ?", [licencia.lic_id], (err, rows) => {
								//console.log('Licencia '+ licencia.lic_id + ' vencida');
								//resolve('Licencia '+ licencia.lic_id + ' vencida');
							});
						}
					});
					resolve();
				}else{
					resolve();
				}
			});
		});
	}

	consultarLicenciasUsuario(usr_id){
		return new Promise( function(resolve, reject){
			mysql.query('SELECT lic.*, pl.*, usr.*, log.log_email FROM licencias lic, login log, usuarios usr, planes pl ' 
            + 'WHERE lic.usr_id = log.usr_id AND lic.usr_id = usr.usr_id AND pl.plan_id = lic.plan_id AND lic.usr_id = ?', [usr_id], (err, rows) => {
				if(!err && rows.length > 0){
					let licencias = [];
					rows.map(row => {
						let licencia = new licenciaModel(row.lic_id, row.lic_fecha_creacion, row.lic_fecha_expiracion, row.lic_estado, row.usr_id, row.plan_id);
                        let plan = new planModel(row.plan_id, row.plan_nombre, row.plan_precio, row.plan_descripcion, row.plan_duracion);
                        licencias.push({
                            licencia: licencia,
                            plan: plan
                        });
					});
					resolve(licencias);
				}else{
					reject();
				}
			});
		});
	}

	suspenderLicencia(lic_id){
		return new Promise( function(resolve, reject){
			mysql.query("UPDATE licencias SET lic_estado = 'suspendida' WHERE lic_id = ?", [lic_id], (err, rows) => {
				if(!err){
					resolve({rowsAffected: rows.rowsAffected});
				}else{
					reject();
				}
			});
		});
	}

	reactivarLicencia(lic_id){
		return new Promise( function(resolve, reject){
			mysql.query("UPDATE licencias SET lic_estado = 'activa' WHERE lic_id = ?", [lic_id], (err, rows) => {
				if(!err){
					resolve({rowsAffected: rows.rowsAffected});
				}else{
					reject();
				}
			});
		});
	}

	consultarLicenciasActivasUsuario(usr_id){
		return new Promise( function(resolve, reject){
			mysql.query('SELECT lic.*, pl.*, usr.*, log.log_email FROM licencias lic, login log, usuarios usr, planes pl ' 
            + "WHERE lic.usr_id = log.usr_id AND lic.usr_id = usr.usr_id AND pl.plan_id = lic.plan_id AND lic.usr_id = ? AND lic.lic_estado = 'activa'", [usr_id], (err, rows) => {
				if(!err && rows.length > 0){
					let licencias = [];
					rows.map(row => {
						let licencia = new licenciaModel(row.lic_id, row.lic_fecha_creacion, row.lic_fecha_expiracion, row.lic_estado, row.usr_id, row.plan_id);
                        let plan = new planModel(row.plan_id, row.plan_nombre, row.plan_precio, row.plan_descripcion, row.plan_duracion);
                        licencias.push({
                            licencia: licencia,
                            plan: plan
                        });
					});
					resolve(licencias);
				}else{
					resolve(false);
				}
			});
		});
	}
	
	crearLicencia(licencia){
		return new Promise( function(resolve, reject){
			let sql = 'INSERT INTO licencias(lic_fecha_creacion, lic_fecha_expiracion, lic_estado, usr_id, plan_id) VALUES(?,?,?,?,?)';
			let values = [licencia.lic_fecha_creacion, licencia.lic_fecha_expiracion, licencia.lic_estado, licencia.usr_id, licencia.plan_id];
            mysql.query(sql, values, (err, rows) => {
				if(!err){
					resolve({affectedRows: rows.affectedRows});
				}else{
					reject();
				}
			});
		});
    }
    
};