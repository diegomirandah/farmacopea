import React from 'react';
import farmacopea from '../../assets/images/farmacopea.PNG';

function homeComponent(){
    return(
        <div className="container px-0 px-sm-3 py-2 py-sm-2">
          <div className="row justify-content-center align-items-center py-3 py-sm-5">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-justify">
                <h3 className="mb-3 mb-sm-5">¿Qué es Farmacopea?</h3>
                <p>
                Una farmacopea es un texto  recopilatorio de monografías de materias primas y de medicamentos , en los que 
                se incluyen especificaciones de calidad. Las farmacopeas se editan desde el Renacimiento y,  más tarde, fueron 
                de tenencia obligatoria en las oficinas de farmacia.
                </p>
                <p>
                Las farmacopeas son códigos oficiales, un marco legislativo, que recogen los estándares o requisitos de calidad 
                de las materias primas farmacéuticas de mayor uso y de sus  formas farmacéuticas. Pone a disposición de todos 
                los ciudadanos la información técnica sobre medicamentos.
                </p>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 text-center text-lg-right">
                <img alt="farmacopea" className="w-75" src={farmacopea}/>
            </div>
            </div>
            <div className="row py-5">
            <div className="col-12 text-justify">
                <h4>Cómo funciona la plataforma</h4>
                <p>Farmacopea Chilena ofrece diversos contenidos a través de su plataforma realizando suscripciones y obteniendo licencias. Se puede revisar de
                    manera gratuita el índice del contenido que se ofrece. Para accede a este contenido es necesario generar una orden de compra desde el menú "ver planes"
                    teniendo una sesión iniciada con una cuenta creada anteriormente y luego realizando el pago correspondiente. Una vez realizado esto se dispondrá
                    automáticamente el contenido ofrecido.
                </p>
            </div>
          </div>
        </div>
    );
}

export default homeComponent;
