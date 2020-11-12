import axios from 'axios';
import config from '../config';
import FormData from 'form-data'
import SessionService from './SessionService';

const sessionService = new SessionService();
export default class ImagenesService{

    imagenesContenido(cont_id){
        return ( new Promise( (resolve, reject) => {
            axios.get(config.apiUrl + '/imagenes/consultar/contenido/' + cont_id, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

    subirImagen(file){
        let data = new FormData();
        //data.append('file', file, file.fileName);
        data.append('sampleFile', file);
        return ( new Promise( (resolve, reject) => {
        
        axios.post(config.apiUrl + '/imagenes/subir', data, {
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              'Authorization': 'Bearer '+ sessionService.getToken()
            }
          })
            .then( resp => {
              //handle success
              resolve(resp.data);
            }).catch( err => {
              //handle error
              reject(err);
            });
        }));
    }

    agregarImagenContenido(imagen){
        return ( new Promise( (resolve, reject) => {
            axios.post(config.apiUrl + '/imagenes/contenido/agregar', imagen, config.axios)
            .then( resp => {
                resolve(resp.data);
            })
            .catch( err => {
                reject(err);
            });
        }));
    }

 
}
