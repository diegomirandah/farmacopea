import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ContenidosService from '../../services/ContenidosService';
import ContenidoModel from '../../models/ContenidoModel';
import { Spinner } from 'react-bootstrap';
import UnauthorizedComponent from '../error/UnauthorizedComponent';

const contenidosService = new ContenidosService();
function BuscarContenidoComponent(props) {
  
  const cont_nombre = useParams().cont_nombre;
  const [queryStr, setQueryStr] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [contenidos, setContenidos] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect( () => {
    setQueryStr(cont_nombre);
    contenidosService.buscarContenido(cont_nombre).then(res => {  
        if(res.code === 401){
          setUnauthorized(true);
        }
        if(res.status === 'OK' && res.code === 200 && res.data.length > 0){
            //setContenidos(res.data);
          let cont = [];  
          res.data.forEach(contenido => {
                let c = new ContenidoModel(contenido.cont_id, new Date(contenido.cont_fecha_creacion), contenido.cont_nombre, contenido.cont_descripcion, contenido.cont_tipo);
                cont.push(c);
            });
            setContenidos(cont);
  
        }
        setLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  if(unauthorized){
    return (<UnauthorizedComponent/>);
  }else{
    return (
      <div className="container px-0 px-sm-3 py-4 py-sm-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h4>Mostrando resultados para la búsqueda: {queryStr}</h4>
          </div>
        </div>
        {loading && <div className="container"><div className="row justify-content-center my-5 py-5"><Spinner animation="border" variant="primary" size="md" /></div></div>}
        {contenidos && !loading && contenidos.map( contenido => (
          <div key={contenido.cont_id} className="row mt-3 justify-content-center">
              <div className="col-12">
                  <p className="my-0 ">
                      <Link to={{pathname: '/contenidos/ver/'+contenido.cont_nombre, cont_id: contenido.cont_id}}><b>{contenido.cont_nombre}</b></Link> en categoría de {contenido.cont_tipo}. <small><i>Publicado el {contenido.cont_fecha_creacion.toLocaleString("es-CL")}</i></small>
                  </p>
              </div>
          </div>
        ))}
        {!loading && !contenidos && 
          <div className="row justify-content-center py-5">
              <div className="col-12">
                  <p>No hay resultados para esta búsqueda.</p>
              </div>
          </div>
        }
      </div>
    );
  }
}

export default BuscarContenidoComponent;
