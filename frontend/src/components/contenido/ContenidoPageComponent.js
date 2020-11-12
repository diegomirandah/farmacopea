import React, { useState, useEffect } from 'react';
import ContenidoListComponent from './ContenidoListComponent';
import ContenidoLoadPanelComponent from './ContenidoLoadPanelComponent';
import LicenciasService from '../../services/LicenciasService';
import SessionService from '../../services/SessionService';
import { useParams } from 'react-router-dom';
import NoLicenseComponent from '../error/NoLicenseComponent';
import { Spinner } from 'react-bootstrap';

const sessionService = new SessionService();
const licenciasService = new LicenciasService(); 
  
function ContenidoPageComponent(props) {

  const cont_nombre = useParams().cont_nombre;
  const cont_id = useParams().cont_id;

  const usr_id = sessionService.getUserData().usuario.usr_id;
  const [lic_id, setLicencia] = useState(false);
  const [plan_id, setPlan] = useState(false);
  const [loading, setLoading] = useState(true);
  const isGestorContenidos = sessionService.isGestorContenidos();
  const isAdmin = sessionService.isAdmin();

  useEffect(() => {
    
    licenciasService.consultarLicenciaActivaUsuario(usr_id).then(res => {
      //console.log(res);
      if(res.code === 200){
        //console.log(res.data);
        res.data.forEach(lic => {
          if(lic.licencia.lic_estado === 'activa'){
            setLicencia(lic.licencia.lic_id);
            setPlan(lic.licencia.plan_id);
            
          }  
        });
        
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(isAdmin || isGestorContenidos){
    return(
      <div className="container px-0 px-sm-3 py-2 py-sm-3">
        <div className="row pt-sm-3">
            <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3 contenido-list-container">
              <ContenidoListComponent plan_id={plan_id}/>
            </div>
            <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-9">
              <ContenidoLoadPanelComponent cont_nombre={cont_nombre} cont_id={cont_id}/>
          </div>        
        </div>
      </div>
    );
  }

  if(!loading && lic_id){
    return (
      <div className="container px-0 px-sm-3 py-2 py-sm-3">
        <div className="row pt-sm-3">
            <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3">
              <ContenidoListComponent plan_id={plan_id}/>
            </div>
            <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-9">
              <ContenidoLoadPanelComponent cont_nombre={cont_nombre} cont_id={cont_id}/>
          </div>        
        </div>
      </div>
    );
  }
  
  if(!loading && !lic_id){
    return (<NoLicenseComponent/>);
  }
  
  return(<div className="container"><div className="row justify-content-center my-5 py-5"><Spinner animation="border" variant="primary" size="md" /></div></div>);
}

export default ContenidoPageComponent;