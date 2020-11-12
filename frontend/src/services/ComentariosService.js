import axios from 'axios';
import config from '../config';
//import jwt from 'jsonwebtoken';


export default class ComentariosService{

    consultarComentarios(){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/comentarios' , config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }
    
    consultarComentariosPorEstado(com_estado){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/comentarios/estado/' + com_estado , config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    comentariosContenido(cont_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/comentarios/contenido/' + cont_id , config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    comentarContenido(comentario){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/comentarios/comentar/' + comentario.cont_id, comentario, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    marcarComentarioComoVisto(com_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/comentarios/marcar/visto/' + com_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    eliminarComentario(com_id){
        return ( new Promise( (resolve, reject) => {
            axios.delete(config.apiUrl + '/comentarios/eliminar/' + com_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }
}