/*USUARIOS ROUTER
Aquí se encuentran las rutas a las que serán realizadas las peticiones
bajo http://api/usuarios/ruta.
*/

'use strict';
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

/*GET REQUEST*/
router.get('/', usuariosController.consultarUsuarios);
router.get('/buscar/:usr_id', usuariosController.buscarUsuario);

/*POST REQUEST*/
router.post('/agregar', usuariosController.crearUsuario);
router.post('/coincidencia', usuariosController.coincidenciaUsuario);

/*PUT REQUEST*/
router.put('/modificarTipo/:usr_id', usuariosController.modificarTipoUsuario);
router.put('/actualizardatos', usuariosController.actualizarDatosUsuario);

/*DELETE REQUEST*/
router.delete('/eliminar/:usr_id',usuariosController.eliminarUsuario);

module.exports = router;
