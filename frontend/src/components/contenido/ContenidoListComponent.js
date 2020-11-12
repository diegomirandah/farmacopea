import React, { useState,useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import ContenidosService from '../../services/ContenidosService';
import ContenidoItemsListComponent from './ContenidoItemsListComponent';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const contenidosService = new ContenidosService();
function ContenidoListComponent(props) {
  
  const [tiposContenidos, setTiposContenidos] = useState(false);
  useEffect( () => {
    if(props.plan_id){
      contenidosService.consultarTiposContenidosPorPlan(props.plan_id).then(res => {
        //console.log(res.data);
        setTiposContenidos(res.data);
      });
    }else{
      contenidosService.consultarTiposContenidos().then(res => {
        //console.log(res.data);
        setTiposContenidos(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rightArrow = <FontAwesomeIcon className="mr-2" icon={faChevronRight} />
  
  const [toggle, setToggle] = useState(false);

  return (
    <Accordion className="contenido-list">
      {tiposContenidos &&
      <Card className="border-0" key={0}>
        <Accordion.Toggle className="pl-2 bg-white" as={Card.Header} eventKey={0}>
        <Link to="/contenidos/ver/todo"><b>Inicio</b></Link>
        </Accordion.Toggle>
      </Card>}
      
            {tiposContenidos ? tiposContenidos.map( (tipo, index) => (
            <Card className="border-0" key={index+1}>
                <Accordion.Toggle onClick={() => setToggle(!toggle)} as={Card.Header} className="pl-2 bg-white border-0" eventKey={index+1}>
                {rightArrow}<b>{tipo}</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index+1}>
                <Card.Body className="p-0">
                    <ContenidoItemsListComponent plan_id={props.plan_id} cont_tipo={tipo}></ContenidoItemsListComponent>
                </Card.Body>
                </Accordion.Collapse>
            </Card> 
            )) : (
                <Skeleton count={5} className="mt-3" height={30}/>
            )}      
    </Accordion>
  );
}

export default ContenidoListComponent;
