/*COMPRAS ROUTER
Aquí se encuentran las rutas a las que serán realizadas las peticiones
bajo http://api/compras/ruta.
*/

'use strict';
const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

/*GET REQUEST*/
router.get('/consultar', comprasController.consultarCompras);
router.get('/detalle/:comp_id', comprasController.consultarCompra);
router.get('/usuario/:usr_id', comprasController.consultarComprasCliente);
router.get('/anio/:anio', comprasController.consultarComprasPorAnio);
router.get('/primeracompra', comprasController.consultarPrimeraCompra);

/*POST REQUEST*/
router.post('/realizar', comprasController.realizarCompra);

module.exports = router;
