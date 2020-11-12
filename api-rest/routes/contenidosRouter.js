/*CONTENIDO ROUTER
Aquí se encuentran las rutas a las que serán realizadas las peticiones
bajo http://api/contenido/ruta.
*/

'use strict';
const express = require('express');
const router = express.Router();
const contenidosController = require('../controllers/contenidosController');

/*GET REQUEST*/
router.get('/consultar', contenidosController.consultarContenidos);
router.get('/plan/:plan_id', contenidosController.consultarContenidosPlan);
router.get('/buscar/:cont_nombre', contenidosController.buscarContenido);
router.get('/consultar/id/:cont_id', contenidosController.consultarContenidoPorId);
router.get('/consultartipos', contenidosController.consultarTiposContenidos);
router.get('/vercambios', contenidosController.verCambiosContenidos);
router.get('/consultartipos/plan/:plan_id', contenidosController.consultarTiposContenidosPorPlan);

/*POST REQUEST*/
router.post('/agregar', contenidosController.agregarContenido);
router.post('/consultar/tipo', contenidosController.consultarContenidosPorTipo);
router.post('/consultar/nombre', contenidosController.consultarContenidoPorNombre);
router.post('/consultar/tipoyplan', contenidosController.consultarContenidosPorTipoYPlan);

/*PUT REQUEST*/
router.put('/actualizar/:cont_id', contenidosController.actualizarContenido);

/*DELETE REQUEST*/
router.delete('/eliminar/:cont_id', contenidosController.eliminarContenido);

module.exports = router;
