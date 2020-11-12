/*IMAGENES CONTROLLER
Controla los datos enviados por cada petición, llamando al caso de uso
correspondiente, el que a través del repositorio gestiona los datos que
son devueltos por este. Posteriormente el controlador se encarga de
retornar datos y estados de las peticiones al cliente.
*/

'use strict';
const reply = require('../utils/reply');
const config = require('../config');

/*Repositorios*/ 
const imagenesRepository = require('../repositories/imagenesRepository');
const imagenesRepo = new imagenesRepository();

/*Casos de uso*/
const contenidoAgregarImagenes = require('../use_cases/contenidoAgregarImagenes');
const consultarImagenesContenido = require('../use_cases/consultarImagenesContenido');

/*Modelos*/
const imagenModel = require('../models/imagenModel');

module.exports = {
	async subirImagen(req, res){
		try {
	      //console.log(req.files);
	      /*if (!req.files || Object.keys(req.files).length === 0) {
		    return res.status(400).send('No files were uploaded.');
		  }*/


		  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		  let sampleFile = req.files.sampleFile;
		  console.log('Subiendo a '+ config.uploadsFolder + '/' + sampleFile.name);
		  // Use the mv() method to place the file somewhere on your server
		  sampleFile.mv(config.uploadsFolder + '/' + sampleFile.name, function(err) {
		    if (err){
		      console.log(err);
		      return res.status(500).send(err);
		    }

		    res.send('File uploaded!');
		  });
	    } catch (err) {
	        res.json(reply.error(400, err));
	    }
	},

	async contenidoAgregarImagenes(req, res){
		try {
	      	let body = req.body;
			let imagen = new imagenModel(null, body.cont_id, body.ima_nombre);
			if(!imagen.cont_id || !imagen.ima_nombre){
				res.json(reply.error(400,'Faltan datos de entrada.'));
				return;
			}
			
			const resp = await contenidoAgregarImagenes(imagen, {imagenesRepo});
			res.json(reply.ok(200,null, 'La imagen ha sido agregada al contenido'));
	    } catch (err) {
	        res.json(reply.error(400, err));
	    }
	},

	async consultarImagenesContenido(req, res){
		try {
			let cont_id = req.params.cont_id;
			if(!cont_id){
				res.json(reply.error(400,'Faltan id del contenido.'));
				return;
			}
			
			const resp = await consultarImagenesContenido(cont_id, {imagenesRepo});
			res.json(reply.ok(200,resp,'Mostrando imagenes del contenido.'));
	    } catch (err) {
	        res.json(reply.error(400, err));
	    }
	},
}