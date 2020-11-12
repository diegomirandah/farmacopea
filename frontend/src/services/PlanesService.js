import axios from 'axios';
import config from '../config';

export default class PlanesService{

    verPlanes(){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/planes/ver')
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarPlan(plan_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/planes/consultar/' + plan_id)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarPlanesContenido(cont_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/planes/planescontenido/' + cont_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    agregarContenidoPlan(cont_id, plan_id){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/planes/agregarcontenido', {cont_id: cont_id, plan_id: plan_id}, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    quitarContenidoPlan(cont_id, plan_id){
        return ( new Promise( (resolve, reject) => {
            axios.delete(config.apiUrl + '/planes/quitarcontenido/' + cont_id + '/' + plan_id , config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }
 
}
