import axios from 'axios';
import config from '../config';

export default class LicenciasService{

    consultarLicencias(){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/licencias/consultar', config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarEstadoLicencias(){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/licencias/consultarestado', config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    suspenderLicencia(lic_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/licencias/suspender/' + lic_id , config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    reactivarLicencia(lic_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/licencias/reactivar/' + lic_id , config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarLicenciasUsuario(usr_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/licencias/usuario/' + usr_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarLicenciaActivaUsuario(usr_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/licencias/activas/usuario/' + usr_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }
}
