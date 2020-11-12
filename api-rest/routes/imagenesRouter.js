/*IMAGENES ROUTER
Aquí se encuentran las rutas a las que serán realizadas las peticiones
bajo http://api/imagenes/ruta.
*/

'use strict';
const express = require('express');
const router = express.Router();
const imagenesController = require('../controllers/imagenesController');

/*GET REQUEST*/
router.get('/consultar/contenido/:cont_id', imagenesController.consultarImagenesContenido);

/*POST REQUEST*/
router.post('/subir', imagenesController.subirImagen);
router.post('/contenido/agregar', imagenesController.contenidoAgregarImagenes);

module.exports = router;
