import React, { useState,useEffect } from 'react';
import {  Link } from 'react-router-dom';
import ContenidosService from '../../services/ContenidosService';
import Skeleton from 'react-loading-skeleton';
import { Jumbotron, Button } from 'react-bootstrap';
import SessionService from '../../services/SessionService';
import EliminarContenidoModalComponent from './EliminarContenidoModalComponent';
import AgregarComentarioComponent from '../comentarios/AgregarComentarioComponent';
import GaleriaComponent from './GaleriaComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const sessionService = new SessionService();
const contenidosService = new ContenidosService();
function ContenidoLoadPanelComponent(props) {
  
  //let location = useLocation();
  const [contenido, setContenido] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isGestorContenidos, setIsGestorContenidos] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //console.log(props);
  useEffect( () => {
    setIsGestorContenidos(sessionService.isGestorContenidos());
    setIsAdmin(sessionService.isAdmin());
    
    //contenidosService.consultarContenidoPorNombre(props.cont_nombre).then( res => { 
    contenidosService.consultarContenidosPorId(props.cont_id).then( res => {
        if(res.status === 'OK' && res.data.length === 0){
          setContenido(false);
        }else{
          setContenido(res.data);
        }
        setLoading(false);     
      });
  }, [props]);


  return (
    <div>
      {contenido && 
        <div className="row justify-content-center">  
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-8">
            <h2>{contenido.cont_nombre}</h2>
          </div>
          
          { (isGestorContenidos || isAdmin) ? 
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 text-left text-lg-right my-4 my-lg-0">
            <Link className="text-white" to={{pathname: '/contenidos/editar/'+contenido.cont_nombre + '/' + contenido.cont_id, query: { cont_nombre: contenido.cont_nombre}, cont_id: contenido.cont_id}}>
            <Button variant="warning text-white">
              <FontAwesomeIcon className="mr-2" icon={faEdit} />Editar
            </Button>
            </Link>
            <EliminarContenidoModalComponent cont_id={contenido.cont_id} />
            
          </div>
          : <div className="col-4"></div>}

            <div>
              <GaleriaComponent cont_id={contenido.cont_id}/>
            </div>

          <div className="col-12">
          <div className="text-justify" dangerouslySetInnerHTML={{__html: contenido.cont_descripcion}} />
          </div>
          <div className="col-12 my-3">
              <AgregarComentarioComponent cont_id={contenido.cont_id}/>
          </div>
        </div>
      }
      { loading &&
        <div className="row justify-content-center pt-1">
          <div className="col-12 pt-2">
          <Skeleton className="mb-3" width={500} height={40}/> 

          <Skeleton className="mb-5" height={300}/> 
          
          <Skeleton count={3}/>
            
          </div>
        </div>
      }
      { !contenido && !loading &&
        <Jumbotron style={{minHeight: '50vh'}}>
        <h1>Contenidos Farmacopea Chilena.</h1>
        <p>
          Aquí puedes consultar los contenidos que posee la plataforma. Puedes usar el buscador de contenido en la barra de navegación. Podrás también
          realizar comentarios indicando alguna mejora o sugerencia para nuestro contenido. Puedes revisar nuestro video tutorial de como utilizar el sistema.
        </p>
        
      </Jumbotron>
      }
    </div>
  );
}

export default ContenidoLoadPanelComponent;
