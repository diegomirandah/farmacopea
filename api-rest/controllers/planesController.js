/*USUARIOS CONTROLLER
Controla los datos enviados por cada petición, llamando al caso de uso
correspondiente, el que a través del repositorio gestiona los datos que
son devueltos por este. Posteriormente el controlador se encarga de
retornar datos y estados de las peticiones al cliente.
*/

'use strict';
const reply = require('../utils/reply');

/*Repositorios*/ 
const planesRepository = require('../repositories/planesRepository');
const planesRepo = new planesRepository();

/*Casos de uso*/
const verPlanes = require('../use_cases/verPlanes');
const consultarPlan = require('../use_cases/consultarPlan');
const eliminarPlan = require('../use_cases/eliminarPlan');
const agregarPlan = require('../use_cases/agregarPlan');
const agregarContenidoPlan = require('../use_cases/agregarContenidoPlan');
const quitarContenidoPlan = require('../use_cases/quitarContenidoPlan');
const actualizarPlan = require('../use_cases/actualizarPlan');
const consultarPlanesContenido = require('../use_cases/consultarPlanesContenido');


/*Modelos*/
const planModel = require('../models/planModel');
const contenidoModel = require('../models/contenidoModel');

module.exports = {
	async verPlanes(req, res){
		try{
			const resp = await verPlanes({planesRepo});
			if(resp.length > 0)
				res.json(reply.ok(200,resp));
			else
				res.json(reply.ok(201,null,'No se han encontrado planes.'));
		}catch(err){
			res.json(reply.ok(201,err));
		}
	},

	async consultarPlan(req, res){
		try{
			let plan_id = req.params.plan_id;
			if(!plan_id){
				res.json(reply.error(400,'Falta id del plan.'));
				return;
			}
			const resp = await consultarPlan(plan_id, {planesRepo});
			res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.ok(201,null, 'No se ha encontrado el plan.'));
		}
	},

	async consultarPlanesContenido(req, res){
		try{
			let cont_id = req.params.cont_id;
			if(!cont_id){
				res.json(reply.error(400,'Falta id de contenido.'));
				return;
			}
			const resp = await consultarPlanesContenido(cont_id, {planesRepo});
			if(resp.length > 0)
				res.json(reply.ok(200,resp));
			else
				res.json(reply.ok(201,null,'El contenido no se encuentra en ningún plan.'));
		}catch(err){
			res.json(reply.ok(201,err));
		}
	},

	async agregarPlan(req, res){
		try{
			let body = req.body;
			let plan = new planModel(null, body.plan_nombre, body.plan_precio, body.plan_descripcion, body.plan_duracion);
			if(!plan.plan_nombre || !plan.plan_precio || !plan.plan_descripcion || !plan.plan_duracion){
				res.json(reply.error(400,'Faltan datos de entrada.'));
				return;
			}
			
			const resp = await agregarPlan(plan, {planesRepo});
			res.json(reply.ok(200,null, 'El plan ha sido agregado con éxito.'));
		}catch(err){
			if(err.code == 'ER_DUP_ENTRY'){
				res.json(reply.error(500,'El plan ya se encuentra registrado.'));
				return null;
			}
			res.json(reply.fatal(500,err));
		}
	},

	async agregarContenidoPlan(req, res){
		try{
			let body = req.body;
			let contenido = new contenidoModel(body.cont_id, null, null, null, null);
			let plan = new planModel(body.plan_id, null, null, null, null);
			if(!plan.plan_id){
				res.json(reply.error(400,'Falta id del plan.'));
				return;
			}

			if(!contenido.cont_id){
				res.json(reply.error(400,'Falta id del contenido.'));
				return;
			}
			
			const resp = await agregarContenidoPlan(contenido, plan, {planesRepo});
			res.json(reply.ok(200,null, 'El contenido ha sido agregado al plan.'));
		}catch(err){
			res.json(reply.fatal(500,err));
		}
	},

	async quitarContenidoPlan(req, res){
		try{
			let contenido = new contenidoModel(req.params.cont_id, null, null, null, null);
			let plan = new planModel(req.params.plan_id, null, null, null, null);
			if(!plan.plan_id){
				res.json(reply.error(400,'Falta id del plan.'));
				return;
			}

			if(!contenido.cont_id){
				res.json(reply.error(400,'Falta id del contenido.'));
				return;
			}
			
			const resp = await quitarContenidoPlan(contenido, plan, {planesRepo});
			res.json(reply.ok(200,null, 'El contenido ha sido quitado del plan.'));
		}catch(err){
			res.json(reply.fatal(500,err));
		}
	},
	
	async actualizarPlan(req, res){
		try{
			let body = req.body;
			let plan = new planModel(req.params.plan_id, body.plan_nombre, body.plan_precio, body.plan_descripcion, body.plan_duracion);
			if(!plan.plan_nombre || !plan.plan_precio || !plan.plan_descripcion || !plan.plan_duracion){
				res.json(reply.error(400,'Faltan datos de entrada.'));
				return;
			}
			
			const resp = await actualizarPlan(plan, {planesRepo});
			if(resp.affectedRows == 1)
				res.json(reply.ok(200,null, 'El plan ha sido actualizado.'));
			else
				res.json(reply.ok(201,null,'No se han realizado cambios.'));
		}catch(err){
			res.json(reply.error(400,err));
		}
	},
	
	async eliminarPlan(req, res){
		try{
			let plan_id = req.params.plan_id;
			if(!plan_id){
				res.json(reply.error(400,'Debe ingresar el plan.'));
			}
			const resp = await eliminarPlan(plan_id, {planesRepo});
			if(resp.affectedRows == 1)
				res.json(reply.ok(200,null, 'El plan ha sido eliminado.'));
			else
				res.json(reply.ok(201,null,'No se ha encontrado el plan.'));
		}catch(err){
			res.json(reply.error(400,err));
		}
	}
};	