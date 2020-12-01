import React, { useState,useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import ImagenesService from '../../services/ImagenesService';
import config from '../../config';
const imagenesService = new ImagenesService();

function GaleriaComponent(props) {
  
  //const [loading, setLoading] = useState(true);

  const [imagenes, setImagenes] = useState([]);

  useEffect( () => {
    //console.log('cargando caoursel');
    imagenesService.imagenesContenido(props.cont_id).then(res => {
      //console.log(res.data);
      setImagenes(res.data);
      //setLoading(false);
    });
  }, [props]);
 
  return (
    <div className="col-12">
      
      <Carousel>
      {imagenes.length > 0 && imagenes.map( (imagen, index) => (
      <Carousel.Item key={index+1}>
        <img
          className="d-block w-100"
          src={config.uploadsPath + '/' + imagen.ima_nombre}
          alt="First slide"
        />
      </Carousel.Item>  
    
    ))}
    </Carousel>
  
  </div>
  );
}

export default GaleriaComponent;
