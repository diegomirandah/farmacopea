import React, { useState,useEffect } from 'react';
import ContenidosService from '../../services/ContenidosService';
import SessionService from '../../services/SessionService';
import { Link } from 'react-router-dom';

const contenidosService = new ContenidosService();
const sessionService = new SessionService();
function ContenidoItemsListComponent(props) {
  const [contenidos, setContenidos] = useState(false);
  useEffect( () => {
      if(sessionService.isGestorContenidos() || sessionService.isAdmin()){
        contenidosService.consultarContenidosPorTipo(props.cont_tipo).then(res => {
          setContenidos(res.data);
        });
      }else{
        contenidosService.consultarContenidosPorTipoYPlan(props.cont_tipo, props.plan_id).then(res => {
          setContenidos(res.data);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ml-4 py-1">
        {contenidos && contenidos.map( contenido => (
            <div key={contenido.cont_id}>
                <Link to={'/contenidos/ver/' + contenido.cont_nombre + '/' + contenido.cont_id}>{contenido.cont_nombre}</Link>
            </div>
        ))}
    </div> 
  );
}

export default ContenidoItemsListComponent;
