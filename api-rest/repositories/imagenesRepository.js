'use strict';
const mysql = require('../database/database');
const imagenModel = require('../models/imagenModel');

module.exports = class {
	contenidoAgregarImagenes(imagen){
        
        mysql.query('SELECT * FROM imagenes WHERE cont_id = ? AND ima_nombre = ?', [imagen.cont_id, imagen.ima_nombre], (err, rows) => {
			if(!err && rows.length > 0){
				return new Promise( function(resolve, reject){resolve({affectedRows: rows.length})});
					
			}else{
				return new Promise( function(resolve, reject){	
					mysql.query('INSERT INTO imagenes(cont_id, ima_nombre) VALUES(?,?)', [imagen.cont_id, imagen.ima_nombre], (err, rows) => {
						if(!err){
							resolve({affectedRows: rows.affectedRows});
						}else{
							reject();
						}
					});
				});
			}
		});	
    }

    consultarImagenesContenido(cont_id){
    	return new Promise( function(resolve, reject){
			let imagenes = [];
			mysql.query('SELECT * FROM imagenes WHERE cont_id = ?', [cont_id], (err, rows) => {
				if(!err){
					rows.map(row => {
						let imagen = new imagenModel(row.ima_id, row.cont_id, row.ima_nombre);
						imagenes.push(imagen);
					});
					resolve(imagenes);
				}else{
					reject(err);
				}
			});
		});
    }

};
