import React from 'react';
import { Card } from 'react-bootstrap';
import ComprasBarrasComponent from './ComprasBarrasComponent';
import LicenciasGraficoComponent from './LicenciasGraficoComponent';


function EstadisticasComponent(){
    

    return(
        <div className="container py-3 py-sm-5 p-0 p-md-3">
            <div className="row justify-content-center p-0 p-md-3">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <Card>
                        <Card.Header><b>Compras</b></Card.Header>
                        <Card.Body>
                            <Card.Title className="lead">Compras realizadas por año</Card.Title>
                            <Card.Text className="text-muted">
                            Aquí se muestran las ordenes de compra generadas por cada mes en un año.
                            </Card.Text>
                            <ComprasBarrasComponent/>
                        </Card.Body>
                    </Card>
                </div>
                <div className="mt-4 mt-md-0 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <Card>
                        <Card.Header><b>Licencias</b></Card.Header>
                        <Card.Body>
                            <Card.Title className="lead">Licencias de clientes</Card.Title>
                            <Card.Text className="text-muted">
                            Aquí se muestra el estado de las licencias que poseen los clientes que han realizado una compra.
                            </Card.Text>
                            <LicenciasGraficoComponent/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default EstadisticasComponent;
