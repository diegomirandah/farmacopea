/*PLANES ROUTER
Aquí se encuentran las rutas a las que serán realizadas las peticiones
bajo http://api/planes/ruta.
*/

'use strict';
const express = require('express');
const router = express.Router();
const planesController = require('../controllers/planesController');

/*GET REQUEST*/
router.get('/ver', planesController.verPlanes);
router.get('/consultar/:plan_id', planesController.consultarPlan);
router.get('/planescontenido/:cont_id', planesController.consultarPlanesContenido);

/*POST REQUEST*/
router.post('/agregar', planesController.agregarPlan);
router.post('/agregarcontenido', planesController.agregarContenidoPlan);

/*PUT REQUEST*/
router.put('/actualizar/:plan_id', planesController.actualizarPlan);

/*DELETE REQUEST*/
router.delete('/eliminar/:plan_id',planesController.eliminarPlan);
router.delete('/quitarcontenido/:cont_id/:plan_id',planesController.quitarContenidoPlan);

module.exports = router;
