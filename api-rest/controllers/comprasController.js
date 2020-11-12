/*COMPRAS CONTROLLER
Controla los datos enviados por cada petición, llamando al caso de uso
correspondiente, el que a través del repositorio gestiona los datos que
son devueltos por este. Posteriormente el controlador se encarga de
retornar datos y estados de las peticiones al cliente.
*/

'use strict';
const reply = require('../utils/reply');

/*Repositorios*/ 
const comprasRepository = require('../repositories/comprasRepository');
const comprasRepo = new comprasRepository();

const licenciasRepository = require('../repositories/licenciasRepository');
const licenciasRepo = new licenciasRepository();

/*Casos de uso*/
const realizarCompra = require('../use_cases/realizarCompra');
const crearLicencia = require('../use_cases/crearLicencia');
const consultarCompras = require('../use_cases/consultarCompras');
const consultarPrimeraCompra = require('../use_cases/consultarPrimeraCompra');
const consultarComprasPorAnio = require('../use_cases/consultarComprasPorAnio');
const consultarCompra = require('../use_cases/consultarCompra');
const consultarComprasCliente = require('../use_cases/consultarComprasCliente');
const actualizarEstadoCompra = require('../use_cases/actualizarEstadoCompra');
const consultarLicenciasActivasUsuario = require('../use_cases/consultarLicenciasActivasUsuario');

/*Modelos*/
const compraModel = require('../models/compraModel');
const licenciaModel = require('../models/licenciaModel');
const planModel = require('../models/planModel');

module.exports = {
	async consultarCompras(req, res){
		try{
            const resp = await consultarCompras({comprasRepo});
            if(resp.length > 0){
                res.json(reply.ok(200,resp));
                return;
            }
            res.json(reply.ok(201,resp, 'No se han realizado compras aún.'));      
		}catch(err){
			res.json(reply.error(400,err));
		}
    },

    async consultarComprasPorAnio(req, res){
		try{
            const resp = await consultarComprasPorAnio(req.params.anio, {comprasRepo});
            res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.ok(201,'No se han realizado compras este año.'));
		}
    },

    async consultarPrimeraCompra(req, res){
		try{
            const resp = await consultarPrimeraCompra({comprasRepo});
            res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.ok(201,'No se han realizado compras aún.'));
		}
    },

    async consultarComprasCliente(req, res){
        try{
            const resp = await consultarComprasCliente(req.params.usr_id, {comprasRepo});
            res.json(reply.ok(200,resp));
        }catch(err){
            res.json(reply.error(201,'No ha realizado compras aún.'));
        }
    },

    async consultarCompra(req, res){
        try{
            const resp = await consultarCompra(req.params.comp_id, {comprasRepo});
            res.json(reply.ok(200,resp));
        }catch(err){
            res.json(reply.error(201,'No existe la compra.'));
        }
    },


    async realizarCompra(req, res){
        try{
            let c = req.body.compra;
            let p = req.body.plan;
            let compra = new compraModel(Math.round(Math.random()*999999999), new Date(), c.comp_monto, 'procesando', c.usr_id, c.plan_id);
            if(!compra.comp_fecha_compra || !compra.comp_monto || !compra.comp_estado || !compra.usr_id || !compra.plan_id){
                res.json(reply.error(400,'Faltan datos de la compra.'));
				return;
            }
            let plan = new planModel(p.plan_id, p.plan_nombre, null, null, p.plan_duracion);
            if(!plan.plan_id || !plan.plan_nombre || !plan.plan_duracion){
                res.json(reply.error(400,'Faltan datos del plan.'));
				return;
            }

            /*Comprobar si el usuario no tiene licencias activas*/
            const licenciasUsuario = await consultarLicenciasActivasUsuario(compra.usr_id, {licenciasRepo});
            //console.log(licenciasUsuario);
            if( licenciasUsuario ){
                res.json(reply.error(400,'El usuario ya posee una licencia.'));
                return;
            }

            /*Se realiza orden de compra*/
            let ordenCompraId = await realizarCompra(compra, {comprasRepo});
            if(ordenCompraId.affectedRows == 0){
                res.json(reply.error(404,'Error al crear la orden de pago.'));
                return;
            }
            
            /*Se procesa pago en línea*/
            
            //compra.comp_id = ordenCompraId.insertId;
            //compra.comp_estado = callback(object.status);
            compra.comp_estado = 'aceptado';

            if(compra.comp_estado == 'rechazado'){
                let resp = await actualizarEstadoCompra(compra ,{comprasRepo});
                res.json(reply.ok(200,compra, 'Se ha rechazado el pago.'));
                return;
            }
            
            /*Se actualiza el estado de la compra dependiendo del estado del pago*/
            let resp = await actualizarEstadoCompra(compra ,{comprasRepo});
            if(resp.affectedRows == 0){
                res.json(reply.error(400,'Ha ocurrido un error al actualizar estado de compra.'));
                return;
            }
            
            /*Se crea la licencia para el usuario*/
            let fechaCreacion = new Date();
            let fechaExpiracion = new Date();
            fechaExpiracion.setMonth(fechaCreacion.getMonth() + Number(plan.plan_duracion))
            let licencia = new licenciaModel(null, fechaCreacion, fechaExpiracion, 'activa', compra.usr_id, plan.plan_id);
            
            resp = await crearLicencia(licencia, {licenciasRepo});
            if(resp.affectedRows == 0){
                res.json(reply.error(400,'Ha ocurrido un error al crear licencia.'));
                return;
            }
            
            res.json(reply.ok(200,compra , 'Compra realizada con éxito.'));
        }catch(err){
            res.json(reply.error(400,err));
        }
    }

};	