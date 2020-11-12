import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function UnauthorizedComponent(){
    return(
        <div className="container px-0 px-sm-3 py-5 py-sm-5">
          <div className="row justify-content-center align-items-center py-3 py-sm-5">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-center">
                <h2 className="mb-3 mb-sm-5">
                    <FontAwesomeIcon className="mr-3" style={{fontSize: '4rem'}} icon={faExclamationTriangle} /> 
                    Acceso no autorizado.
                </h2>
                <p>
                 No tienes acceso al contenido solicitado.
                </p>
            </div>
            </div>
        </div>
    );
}

export default UnauthorizedComponent;
