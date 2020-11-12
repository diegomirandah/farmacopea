/*COMENTARIOS ROUTER
Aquí se encuentran las rutas a las que serán realizadas las peticiones
bajo http://api/comentarios/ruta.
*/

'use strict';
const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosController');

/*GET REQUEST*/
router.get('/', comentariosController.consultarComentarios);
router.get('/estado/:com_estado', comentariosController.consultarComentariosPorEstado);
router.get('/contenido/:cont_id', comentariosController.comentariosContenido);

/*POST REQUEST*/
router.post('/comentar/:cont_id', comentariosController.comentarMonografia);

/* PUT REQUEST*/
router.get('/marcar/visto/:com_id', comentariosController.marcarComentarioComoVisto);


/*DELETE REQUEST*/
router.delete('/eliminar/:com_id', comentariosController.eliminarComentario);

module.exports = router;
