/*LICENCIAS ROUTER
Aquí se encuentran las rutas a las que serán realizadas las peticiones
bajo http://api/licencias/ruta.
*/

'use strict';
const express = require('express');
const router = express.Router();
const licenciasController = require('../controllers/licenciasController');

/*GET REQUEST*/
router.get('/consultar', licenciasController.consultarLicencias);
router.get('/consultarestado', licenciasController.consultarEstadoLicencias);
router.get('/usuario/:usr_id', licenciasController.consultarLicenciasUsuario);
router.get('/activas/usuario/:usr_id', licenciasController.consultarLicenciasActivasUsuario);
router.get('/suspender/:lic_id', licenciasController.suspenderLicencia);
router.get('/reactivar/:lic_id', licenciasController.reactivarLicencia);

module.exports = router;
