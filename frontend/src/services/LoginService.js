import axios from 'axios';
import config from '../config';
import SessionService from './SessionService';
const sessionService = new SessionService();

export default class LoginService{

    iniciarSesion(login){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/login/iniciarsesion', login)
            .then( resp => {
                //console.log(resp.data.data);
                if(resp.data.status === 'OK'){
                    sessionService.setToken(resp.data.data);
                    document.location.href='/cuenta/micuenta';
                }
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    registrarse(login, usuario){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/login/registrarse', {login: login, usuario: usuario})
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    cambiarContrasena(login){
        return ( new Promise( (resolve, reject) => {
            axios.put(config.apiUrl + '/login/cambiarcontrasena', login, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    recuperarContrasena(correo){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/login/recuperarcontrasena', {log_email: correo}, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }
  

}
