/*CONTENIDOS CONTROLLER
Controla los datos enviados por cada petición, llamando al caso de uso
correspondiente, el que a través del repositorio gestiona los datos que
son devueltos por este. Posteriormente el controlador se encarga de
retornar datos y estados de las peticiones al cliente.
*/

'use strict';
const reply = require('../utils/reply');
var jwt = require('jsonwebtoken');
var config = require('../config');

/*Repositorios*/ 
const contenidosRepository = require('../repositories/contenidosRepository');
const contenidosRepo = new contenidosRepository();
const licenciasRepository = require('../repositories/licenciasRepository');
const licenciasRepo = new licenciasRepository();

/*Casos de uso*/
const consultarContenidos = require('../use_cases/consultarContenidos');
const buscarContenido = require('../use_cases/buscarContenido');
const agregarContenido = require('../use_cases/agregarContenido');
const actualizarContenido = require('../use_cases/actualizarContenido');
const eliminarContenido = require('../use_cases/eliminarContenido');
const consultarTiposContenidos = require('../use_cases/consultarTiposContenidos');
const consultarTiposContenidosPorPlan = require('../use_cases/consultarTiposContenidosPorPlan');
const consultarContenidosPorTipo = require('../use_cases/consultarContenidosPorTipo');
const consultarContenidosPorTipoYPlan = require('../use_cases/consultarContenidosPorTipoYPlan');
const consultarContenidoPorId = require('../use_cases/consultarContenidoPorId');
const registrarCambiosContenido = require('../use_cases/registrarCambiosContenido');
const consultarContenidosPlan = require('../use_cases/consultarContenidosPlan');
const verCambiosContenidos = require('../use_cases/verCambiosContenidos');
const consultarLicenciasActivasUsuario = require('../use_cases/consultarLicenciasActivasUsuario');
const comprobarContenidoPlan = require('../use_cases/comprobarContenidoPlan');
const consultarContenidoPorNombre = require('../use_cases/consultarContenidoPorNombre');

/*Modelos*/
const contenidoModel = require('../models/contenidoModel');
const cambioModel = require('../models/cambioModel');



module.exports = {
    async verCambiosContenidos(req, res){
		try{
			const resp = await verCambiosContenidos({contenidosRepo});
			if(resp.length > 0)
				res.json(reply.ok(200,resp));
			else
				res.json(reply.ok(201,null,'No existen contenidos aún.'));
		}catch(err){
			res.json(reply.ok(201,err));
		}
    },

    async consultarContenidos(req, res){
		try{
			const resp = await consultarContenidos({contenidosRepo});
			if(resp.length > 0)
				res.json(reply.ok(200,resp));
			else
				res.json(reply.ok(201,null,'No existen contenidos aún.'));
		}catch(err){
			res.json(reply.ok(201,err));
		}
    },

    async buscarContenido(req, res){
        try{
            let cont_nombre = req.params.cont_nombre;
            if(!cont_nombre){
                res.json(reply.error(400,'Debe ingresar una búsqueda.'));
				return null;
            }

            //Comprobar usuario a través del token
            var token = req.headers.authorization;
            token = token.replace('Bearer ', '');
            var decoded = jwt.verify(token, config.secret);
            const login = decoded.login;
            
            if(login.log_tipo === 'gestorContenidos' || login.log_tipo === 'gestorContenidosUsuarios'){
                const resp = await buscarContenido(cont_nombre, {contenidosRepo});
                res.json(reply.ok(200,resp));
            
            }else{ 
                /*En caso de requerir una licencia para consultar contenidos*/
                let licencia = await consultarLicenciasActivasUsuario(login.usr_id, {licenciasRepo});
                //console.log('licencia actual '+licencia[0].plan.plan_id);
                if(licencia){
                    /*Verificar si el contenido pertenece al plan*/
                    const resp = await buscarContenido(cont_nombre, {contenidosRepo});
                    //res.json(reply.ok(200,resp));
                    let contenidos = [];
                    
                    if(resp.length > 0){
                        //resp.forEach(async (contenido) => {
                        for(var i=0; i<resp.length; i++){
                            let contenido = resp[i];
                            //console.log('comprobando contenido '+contenido.cont_id);
                            let contenidoPlan = await comprobarContenidoPlan( contenido.cont_id, licencia[0].plan.plan_id ,{contenidosRepo});
                            if(contenidoPlan){
                                //console.log("agregando");
                                contenidos.push(contenido);
                            }
                        }
                    }
                    
                    if(contenidos.length > 0){
                        res.json(reply.ok(200,contenidos));
                    }else{
                        res.json(reply.ok(201,null,'No existen contenidos con este nombre dentro del plan actual'));   
                    }
                }else{
                    res.json(reply.error(401,'No tienes permiso para ver el contenido.'));
        
                }
            }
            
        }catch(err){
			res.json(reply.ok(201,null,'No existen resultados de la búsqueda.'));
		}
    },

    async consultarTiposContenidos(req, res){
		try{
            const resp = await consultarTiposContenidos({contenidosRepo});
            res.json(reply.ok(200,resp));
        }catch(err){
			res.json(reply.ok(201,null,'No existen contenidos aún.'));
		}
    },

    async consultarTiposContenidosPorPlan(req, res){
        try{
            let plan_id = req.params.plan_id;
            if(!plan_id){
                res.json(reply.error(400, 'Falta el id del plan'));
                return;
            }
            const resp = await consultarTiposContenidosPorPlan(plan_id, {contenidosRepo});
            res.json(reply.ok(200,resp));
        }catch(err){
            res.json(reply.ok(400,err,'No existen contenidos en el plan ' + req.params.plan_id));
        }
    },

    async consultarContenidoPorId(req, res){
		try{
            let cont_id = req.params.cont_id;
            if(!cont_id){
                res.json(reply.error(400,'Debe ingresar el id del contenido.'));
				return null;
            }
            const resp = await consultarContenidoPorId(cont_id, {contenidosRepo});
            res.json(reply.ok(200,resp));
        }catch(err){
			res.json(reply.ok(400,null,'No existe el contenido solicitado.'));
		}
    },

    async consultarContenidoPorNombre(req, res){
		try{
            let cont_nombre = req.body.cont_nombre;
            if(!cont_nombre){
                res.json(reply.error(400,'Debe ingresar el nombre del contenido.'));
				return null;
            }
            const resp = await consultarContenidoPorNombre(cont_nombre, {contenidosRepo});
            res.json(reply.ok(200,resp));
        }catch(err){
			res.json(reply.ok(400,null,'No existe el contenido solicitado.'));
		}
    },

    async consultarContenidosPorTipo(req, res){
		try{
            let cont_tipo = req.body.cont_tipo;
            if(!cont_tipo){
                res.json(reply.error(400,'Debe ingresar el tipo del contenido.'));
				return null;
            }
            const resp = await consultarContenidosPorTipo(cont_tipo, {contenidosRepo});
            res.json(reply.ok(200,resp));
        }catch(err){
			res.json(reply.ok(201,null,'No hay contenidos de este tipo.'));
		}
    },

    async consultarContenidosPorTipoYPlan(req, res){
        try{
            let cont_tipo = req.body.cont_tipo;
            let plan_id = req.body.plan_id;
            if(!cont_tipo || !plan_id){
                res.json(reply.error(400,'Faltan datos de entrada.'));
                return null;
            }
            const resp = await consultarContenidosPorTipoYPlan(cont_tipo, plan_id, {contenidosRepo});
            res.json(reply.ok(200,resp));
        }catch(err){
            res.json(reply.ok(201,null,'No hay contenidos de este tipo.'));
        }
    },

    async consultarContenidosPlan(req, res){
        try{
            let plan_id = req.params.plan_id;
            if(!plan_id){
                res.json(reply.error(400,'Debe ingresar el plan.'));
				return null;
            }
            const resp = await consultarContenidosPlan(plan_id, {contenidosRepo});
            res.json(reply.ok(200,resp));
        }catch(err){
			res.json(reply.ok(201,null,'El plan no posee contenidos aún.'));
		}
    },
    
    async agregarContenido(req, res){
        try{
            let body = req.body;
            let contenido = new contenidoModel(null, new Date(), body.cont_nombre, body.cont_descripcion, body.cont_tipo);
            /*Comprobar entrada de datos*/
			if(!contenido.cont_nombre || !contenido.cont_descripcion || !contenido.cont_tipo){
				res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada.'});
				return null;
			}
            const resp = await agregarContenido(contenido, {contenidosRepo});
			res.json(reply.ok(200,resp,'Contenido agregado con éxito.'));
        }catch(err){
			res.json(reply.fatal(500,err));
        }
    },

    async actualizarContenido(req, res){   
        try{
            let body = req.body;
            let contenido = new contenidoModel(req.params.cont_id, body.cont_fecha_creacion, body.cont_nombre, body.cont_descripcion, body.cont_tipo);
            if(!contenido.cont_id || !contenido.cont_nombre || !contenido.cont_descripcion || !contenido.cont_tipo){
				res.json({status: 'ERROR', errorMessage: 'Faltan datos de entrada.'});
				return null;
            }

            const contenidoAntiguo = await consultarContenidoPorId(contenido.cont_id, {contenidosRepo});
            let cambioContenido = new cambioModel(null, new Date(), contenidoAntiguo.cont_nombre,contenidoAntiguo.cont_descripcion, contenidoAntiguo.cont_id, body.usr_id);
            if(!cambioContenido.usr_id){
				res.json({status: 'ERROR', errorMessage: 'Falta id del usuario.'});
				return null;
            }
            
            const resp = await actualizarContenido(contenido, {contenidosRepo}); 
			if(resp.affectedRows > 0){
                await registrarCambiosContenido(cambioContenido, {contenidosRepo});
				res.json(reply.ok(200,null,'El contenido ha sido modificado con éxito.'));
			}else{
				res.json(reply.error(400,'No se han realizado cambios.'));
			}
        }catch(err){
            res.json(reply.fatal(500,err));
        }
    },

    async eliminarContenido(req, res){
        try{
            let cont_id = req.params.cont_id;
			if(!cont_id){
				res.json(reply.error(400,'Faltan datos de entrada.'));
				return null;
			}
			const resp = await eliminarContenido(cont_id , {contenidosRepo});
			if(resp.affectedRows > 0){
				res.json(reply.ok(200,null,'El contenido se ha eliminado con éxito.'));
			}else{
				res.json(reply.error(400,'No se ha encontrado el contenido.'));
			}
        }catch(err){
            res.json(reply.fatal(500,err));
        }
    }

};