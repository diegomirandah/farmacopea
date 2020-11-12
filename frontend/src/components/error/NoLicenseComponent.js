import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function NoLicenseComponent(){
    return(
        <div className="container px-0 px-sm-3 py-5 py-sm-5">
          <div className="row justify-content-center align-items-center py-3 py-sm-5">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                <h2 className="mb-3 mb-sm-5">
                    <FontAwesomeIcon className="mr-3" style={{fontSize: '3rem'}} icon={faExclamationTriangle} /> 
                    No posees una licencia activa
                </h2>
                <p>
                 No tienes acceso al contenido solicitado. Debes adquirir una licencia realizando la compra o suscripción a uno de nuestros planes.
                </p>
            </div>
            </div>
        </div>
    );
}

export default NoLicenseComponent;
