import axios from 'axios';
import config from '../config';
//import jwt from 'jsonwebtoken';

export default class UsuariosService{

    agregarUsuario(login, usuario){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/usuarios/agregar', {login: login, usuario: usuario}, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    buscarUsuario(usr_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/usuarios/buscar/' + usr_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    coincidenciaUsuario(busqueda){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/usuarios/coincidencia', {usr_id: busqueda}, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarUsuarios(){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/usuarios', config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    eliminarUsuario(usr_id){
        return ( new Promise( (resolve, reject) => {
            axios.delete(config.apiUrl + '/usuarios/eliminar/' + usr_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    actualizarDatosUsuario(usuario, login){
        return ( new Promise( (resolve, reject) => {
            axios.put(config.apiUrl + '/usuarios/actualizardatos/' , {login: login, usuario: usuario}, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    cambiarTipoUsuario(login){
        return ( new Promise( (resolve, reject) => {
            axios.put(config.apiUrl + '/usuarios/modificartipo/' + login.usr_id , login, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

}
