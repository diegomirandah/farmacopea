import React, { useState,useEffect } from 'react';
import PlanesServices from '../../services/PlanesService';
import Skeleton from 'react-loading-skeleton';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const planesService = new PlanesServices();
function PlanesComponent() {
  
  const [loading, setLoading] = useState(true);
  const [planes, setPlanes] = useState(false);
  useEffect( () => {
      planesService.verPlanes().then(res => {
        setPlanes(res.data);
        setLoading(false);
        //console.log(res.data);
      });
  }, []);

  return (
    <div className="container px-0 px-sm-3 py-4 py-sm-5">
        <div className="row pt-sm-4 pt-sm-5 pb-3 pb-sm-5">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <h2>Planes de suscripción</h2>
            <p className="mt-4">Farmacopea ofrece un sistema de acceso en línea al contenido mediante licencias de pago, las que tendrán una duración limitada por la que el usuario
              tendrá acceso a todo el contenido en cualquier momento y en cualquier dispositivo.
            </p>
          </div>
        </div>
        
        {loading &&
          <div className="row justify-content-center pb-5">
            <div className="col-12 col-md-4">
              <Skeleton className="mb-3" height={120}/> 
              <Skeleton count={3}/>
            </div>
            <div className="col-12 col-md-4">
              <Skeleton className="mb-3" height={120}/> 
              <Skeleton count={3}/>
            </div>
            <div className="col-12 col-md-4">
              <Skeleton className="mb-3" height={120}/> 
              <Skeleton count={3}/>
            </div>       
          </div>
        }
        <div className="row justify-content-center pb-5">
        {!loading && planes.length > 0 && planes.map(plan => (
            <div key={plan.plan_id} className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-4 mb-4 text-center">
                <Card>
                    <Card.Header>
                        <h3>{plan.plan_nombre}</h3>
                        <h4>$ {plan.plan_precio}</h4>
                    </Card.Header>
                    <Card.Body>
                       <div className="text-left my-4" dangerouslySetInnerHTML={{__html: plan.plan_descripcion}}></div>
                       <Link style={{color: 'white !important'}} to={'/planes/comprar/' + plan.plan_id}><Button className="text-white"><FontAwesomeIcon className="mr-2" icon={faShoppingBasket} />Comprar</Button></Link>
                    </Card.Body>
                </Card>
            </div>
        ))}
        </div>
    </div>
  );
}

export default PlanesComponent;
