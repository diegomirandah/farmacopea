/*COMENTARIOS CONTROLLER
Controla los datos enviados por cada petición, llamando al caso de uso
correspondiente, el que a través del repositorio gestiona los datos que
son devueltos por este. Posteriormente el controlador se encarga de
retornar datos y estados de las peticiones al cliente.
*/

'use strict';
const reply = require('../utils/reply');

/*Repositorios*/ 
const comentariosRepository = require('../repositories/comentariosRepository');
const comentariosRepo = new comentariosRepository();

/*Casos de uso*/
const comentarMonografia = require('../use_cases/comentarMonografia');
const comentariosContenido = require('../use_cases/comentariosContenido');
const eliminarComentario = require('../use_cases/eliminarComentario');
const consultarComentarios = require('../use_cases/consultarComentarios');
const consultarComentariosPorEstado = require('../use_cases/consultarComentariosPorEstado');
const marcarComentarioComoVisto = require('../use_cases/marcarComentarioComoVisto');

/*Modelos*/
const comentarioModel = require('../models/comentarioModel');

module.exports = {
	async consultarComentarios(req, res){
		try{
            const resp = await consultarComentarios( {comentariosRepo});
			res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.ok(201,err,'No existen comentarios aún.'));
		}
	},
	
	async consultarComentariosPorEstado(req, res){
		try{
            let com_estado = req.params.com_estado;
            if(!com_estado){
                res.json({status: 'ERROR', errorMessage: 'Debe ingresar com_estado.'});
				return null;
            }
            const resp = await consultarComentariosPorEstado( com_estado ,{comentariosRepo});
			res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.ok(201,err,'No existen comentarios en este estado.'));
		}
	},
	
	async comentariosContenido(req, res){
		try{
            let cont_id = req.params.cont_id;
            if(!cont_id){
                res.json({status: 'ERROR', errorMessage: 'Debe ingresar cont_id.'});
				return null;
            }
            const resp = await comentariosContenido( cont_id ,{comentariosRepo});
			res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.ok(201,err,'No existen comentarios aún.'));
		}
	},
	
	async marcarComentarioComoVisto(req, res){
		try{
            let com_id = req.params.com_id;
            if(!com_id){
                res.json({status: 'ERROR', errorMessage: 'Debe ingresar com_id.'});
				return null;
            }
            const resp = await marcarComentarioComoVisto( com_id ,{comentariosRepo});
			res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.ok(201,err,'No existen comentarios en este estado.'));
		}
	},

    async comentarMonografia(req, res){
		try{
            let body = req.body;
            let comentario = new comentarioModel(null, new Date(), body.com_comentario, 'pendiente', body.usr_id, req.params.cont_id);
            if(!comentario.com_fecha_creacion || !comentario.com_estado || !comentario.com_comentario || !comentario.usr_id || !comentario.cont_id){
                res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada.'});
				return null;
            }
            const resp = await comentarMonografia(comentario, {comentariosRepo});
			res.json(reply.ok(200,null, 'Comentario agregado con éxito.'));
		}catch(err){
            if(err.code == 'ER_NO_REFERENCED_ROW_2'){
				res.json(reply.error(500,'El usuario indicado no existe.'));
				return null;
			}
			res.json(reply.ok(400,err));
		}
    },

    async eliminarComentario(req, res){
		try{
            let com_id = req.params.com_id;
			if(!com_id){
				res.json(reply.error(400,'Faltan datos de entrada.'));
				return null;
			}
			const resp = await eliminarComentario(com_id , {comentariosRepo});
			if(resp.affectedRows > 0){
				res.json(reply.ok(200,null,'El comentario se ha eliminado con éxito.'));
			}else{
				res.json(reply.error(400,'No se ha encontrado el comentario.'));
			}
        }catch(err){
            res.json(reply.fatal(500,err));
        }
    }
};