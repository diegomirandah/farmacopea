/*LOGIN ROUTER
Aquí se encuentran las rutas a las que serán realizadas las peticiones
bajo http://api/login/ruta.
*/

'use strict';
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/*POST REQUEST*/
router.post('/iniciarSesion', loginController.iniciarSesion);
router.post('/registrarse', loginController.registrarse);
router.post('/recuperarcontrasena', loginController.recuperarContrasena);

/*PUT REQUEST*/
router.put('/cambiarcontrasena', loginController.cambiarContrasena);

module.exports = router;
