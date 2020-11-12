import axios from 'axios';
import config from '../config';

export default class ComprasService{

    realizarCompra(compra, plan){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/compras/realizar', {compra: compra, plan: plan}, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    comprasUsuario(usr_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/compras/usuario/' + usr_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarCompra(comp_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/compras/detalle/' + comp_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarComprasPorAnio(anio){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/compras/anio/' + anio, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    consultarPrimeraCompra(){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/compras/primeracompra', config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }
   
 
}
