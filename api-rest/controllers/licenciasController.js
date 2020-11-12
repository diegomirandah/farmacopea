/*LICENCIAS CONTROLLER
Controla los datos enviados por cada petición, llamando al caso de uso
correspondiente, el que a través del repositorio gestiona los datos que
son devueltos por este. Posteriormente el controlador se encarga de
retornar datos y estados de las peticiones al cliente.
*/

'use strict';
const reply = require('../utils/reply');

/*Repositorios*/ 
const licenciasRepository = require('../repositories/licenciasRepository');
const licenciasRepo = new licenciasRepository();

/*Casos de uso*/
const consultarLicencias = require('../use_cases/consultarLicencias');
const consultarLicenciasUsuario = require('../use_cases/consultarLicenciasUsuario');
const consultarLicenciasActivasUsuario = require('../use_cases/consultarLicenciasActivasUsuario');
const consultarEstadoLicencias = require('../use_cases/consultarEstadoLicencias');
const suspenderLicencia = require('../use_cases/suspenderLicencia');
const reactivarLicencia = require('../use_cases/reactivarLicencia');
const buscarLicencia = require('../use_cases/buscarLicencia');


/*Modelos*/
const licenciaModel = require('../models/licenciaModel');

module.exports = {
	async consultarLicencias(req, res){
		try{
            const resp = await consultarLicencias({licenciasRepo});
            if(resp.length > 0){
                res.json(reply.ok(200,resp));
                return;
            }
            res.json(reply.ok(201,resp, 'No se han adquirido licencias aún.'));      
		}catch(err){
			res.json(reply.error(400,err));
		}
    },

    async buscarLicencia(req, res){
        try{
            let lic_id = req.params.lic_id;
            if(!lic_id){
                res.json(reply.error(400,'Falta el id del usuario'));
                return;
            }
            const resp = await buscarLicencia(lic_id, {licenciasRepo});
            
            res.json(reply.ok(200,resp, 'Licencia del usuario.'));      
        }catch(err){
            res.json(reply.ok(201,null,'El usuario no posee licencias.'));
        }
    },

    async consultarEstadoLicencias(req, res){
		try{
            const resp = await consultarEstadoLicencias({licenciasRepo});
            res.json(reply.ok(200,resp));
		}catch(err){
			res.json(reply.error(201,'No se han adquirido licencias aún.'));
		}
    },

    async consultarLicenciasUsuario(req, res){
        try{
            let usr_id = req.params.usr_id;
            if(!usr_id){
                res.json(reply.error(400,'Falta el id del usuario'));
                return;
            }
            const resp = await consultarLicenciasUsuario(usr_id, {licenciasRepo});
            
            res.json(reply.ok(200,resp, 'Licencia del usuario.'));      
        }catch(err){
            res.json(reply.ok(201,null,'El usuario no posee licencias.'));
        }
    },

    async consultarLicenciasActivasUsuario(req, res){
        try{
            let usr_id = req.params.usr_id;
            if(!usr_id){
                res.json(reply.error(400,'Falta el id del usuario'));
                return;
            }
            const resp = await consultarLicenciasActivasUsuario(usr_id, {licenciasRepo});
            if(resp.length > 0)
               res.json(reply.ok(200,resp, 'Licencia del usuario.'));      
            else    
                res.json(resply.error(201,'El usuario no posee licencias activas'));
        }catch(err){
            res.json(reply.ok(201,null,'El usuario no posee licencias.'));
        }
    },

    async suspenderLicencia(req, res){
        try{
            let lic_id = req.params.lic_id;
            if(!lic_id){
                res.json(reply.error(400,'Falta el id de la licencia'));
                return;
            }
            const resp = await suspenderLicencia(lic_id, {licenciasRepo});
            
            res.json(reply.ok(200,resp, 'Licencia del usuario suspendida.'));      
        }catch(err){
            res.json(reply.ok(400,null,'No se encuentra la licencia.'));
        }
    },

    async reactivarLicencia(req, res){
        try{
            let lic_id = req.params.lic_id;
            if(!lic_id){
                res.json(reply.error(400,'Falta el id de la licencia'));
                return;
            }

            const licencia  = await buscarLicencia(lic_id, {licenciasRepo});
            let fechaActual = new Date();
            let fechaLicencia = new Date(licencia.lic_fecha_expiracion);
            if(fechaLicencia.getTime() > fechaActual.getTime()){
                //console.log('reactivando');
                const resp = await reactivarLicencia(lic_id, {licenciasRepo});
                res.json(reply.ok(200,resp, 'Licencia del usuario reactivada.')); 
            }else{
                //console.log('no se puede reactivar');
                res.json(reply.error(400,'Esta licencia no puede ser reactivada.')); 
            }
                 
        }catch(err){
            res.json(reply.ok(400,null,'Ocurrió un error al reactivar licencia.'));
        }
    },

};	