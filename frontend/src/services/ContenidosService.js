import axios from 'axios';
import config from '../config';
//import jwt from 'jsonwebtoken';


export default class ContenidosService{

    verCambiosContenidos(){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/contenidos/vercambios', config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultar(){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/contenidos/consultar', config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarContenidosPlan(plan_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/contenidos/plan/' + plan_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    buscarContenido(cont_nombre){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/contenidos/buscar/' + cont_nombre, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    agregarContenido(contenido){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/contenidos/agregar', contenido, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarTiposContenidos(){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/contenidos/consultartipos', config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarTiposContenidosPorPlan(plan_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/contenidos/consultartipos/plan/' + plan_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarContenidosPorTipo(cont_tipo){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/contenidos/consultar/tipo', {cont_tipo: cont_tipo}, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarContenidosPorTipoYPlan(cont_tipo, plan_id){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/contenidos/consultar/tipoyplan', {cont_tipo: cont_tipo, plan_id: plan_id}, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarContenidoPorNombre(cont_nombre){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/contenidos/consultar/nombre', {cont_nombre: cont_nombre}, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarContenidosPorId(cont_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/contenidos/consultar/id/' + cont_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    actualizarContenido(contenido, usr_id){
        return ( new Promise( (resolve, reject) => {
            contenido.usr_id = usr_id;
            axios.put(config.apiUrl + '/contenidos/actualizar/' + contenido.cont_id , contenido, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    eliminarContenido(cont_id){
        return ( new Promise( (resolve, reject) => {
            axios.delete(config.apiUrl + '/contenidos/eliminar/' + cont_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }
 
}
