import React, { useState,useEffect } from 'react';
import PlanesServices from '../../services/PlanesService';
import { Table, Spinner, Button, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUndoAlt, faExclamationTriangle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import SessionService from '../../services/SessionService';
import CompraModel from '../../models/CompraModel';
import ComprasService from '../../services/ComprasService';
import { Link, useParams } from 'react-router-dom';

const sessionService = new SessionService();
const planesService = new PlanesServices();
const comprasService = new ComprasService();

function ComprarComponent(props) {

  
  
  const plan_id = useParams().plan_id;
  const [usuario, setUsuario] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [plan, setPlan] = useState(false);

  function realizarCompra(){
    setSubmitting(true);
    let compra = new CompraModel(null, new Date(), plan.plan_precio, null, usuario.usuario.usr_id, plan_id);
    //console.log(compra);
    //console.log(plan);
    comprasService.realizarCompra(compra, plan).then(resp => {
        //console.log(resp);
        if(resp.status === 'OK'){
            document.location.href='/compra/callback/' + resp.data.comp_id;
        }
        if(resp.status === 'ERROR'){
            //console.log(resp);
            document.getElementById('error').classList.remove('d-none');
            document.getElementById('error').classList.add('d-block'); 
            setSubmitting(false);
        }
    });
  }

  useEffect( () => {
    planesService.consultarPlan(plan_id).then(resp => {
        //console.log(resp.data);
        if(resp.status === 'OK'){
            setPlan(resp.data);
        }
    });
    setUsuario(sessionService.getUserData());
    //console.log(sessionService.getUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  function acceptTerms(e) {
    setTermsAccepted(!termsAccepted);
  }

  return (
    <div className="container px-0 px-sm-3 py-4 py-sm-5">
        <div className="row pt-2 pb-3">
            <div className="col-12">
                <h2>Comprar plan de suscripción</h2>
            </div>
        </div>
        <div className="row pt-3 pb-5">
          <div className="col-12 col-sm-12 col-md-6 col-lg-7 col-xl-7 pr-lg-5">
            <h5>Detalles de la compra</h5>
            <p>Comprueba los datos del plan seleccionado para continuar con la compra.</p>
            <Table striped>
                <tbody>
                <tr>
                    <td>Nombre del plan:</td>
                    {plan && <td>{plan.plan_nombre}</td>}
                </tr>
                <tr>
                    <td>Duración:</td>
                    {plan && <td>{plan.plan_duracion} meses</td>}
                </tr>
                <tr>
                    <td>Descripcion:</td>
                    {plan && <td dangerouslySetInnerHTML={{__html: plan.plan_descripcion}}></td>}
                </tr>
                </tbody>
            </Table>
            <Link to="/planes"><Button variant="danger" className="text-white"><FontAwesomeIcon className="mr-2" icon={faUndoAlt} />Volver a planes</Button></Link>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 mt-4 mt-md-0 pl-lg-5">
            <h5>Confirmar datos</h5>
            <p>Verifique sus datos personales para la facturación.</p>
            <Table striped size="sm">
                <tbody>
                <tr>
                    <td>Nombre:</td>
                    <td>{usuario ? usuario.usuario.usr_nombre : '-'}</td>
                </tr>
                <tr>
                    <td>N° Identificación:</td>
                    <td>{usuario ? usuario.usuario.usr_id : '-'}</td>
                </tr>
                <tr>
                    <td>Correo electrónico:</td>
                    <td>{usuario ? usuario.login.log_email : '-'}</td>
                </tr>
                <tr>
                    <td>Empresa:</td>
                    <td>{usuario ? usuario.usuario.usr_empresa : '-'}</td>
                </tr>
                <tr>
                    <td>Ocupacion</td>
                    <td>{usuario ? usuario.usuario.usr_ocupacion : '-'}</td>
                </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Sub-total:</td>
                        <td>$ {plan.plan_precio}</td>
                    </tr>
                    <tr>
                        <td><b>Total:</b></td>
                        <td><b>$ {plan.plan_precio}</b></td>
                    </tr>
                </tfoot>
            </Table>
            <Form>
                <Form.Group>
                    <Form.Check onClick={acceptTerms} type="checkbox" label="Declaro haber revisado el detalle de la compra y acepto los términos y condiciones de Farmacopea Chilena" />
                </Form.Group> 
            </Form>
            {!usuario && <p style={{color: 'red'}}><FontAwesomeIcon className="mr-2" icon={faExclamationTriangle}/>Debes iniciar sesión para continuar con el pago del plan.</p>}            
            {!usuario && <Button href="/login" variant="info" className="col-12 col-lg-7 mb-3 text-white"><FontAwesomeIcon className="mr-2" icon={faSignInAlt}/>Iniciar sesión ahora</Button>}

            <Alert id="error" className="col-12 d-none" variant="danger">
                Ya posees una licencia activa, debes suspenderla desde la sección mi cuenta para luego realizar otra compra.
            </Alert>

            <Button className="col-12 col-lg-7" onClick={realizarCompra} disabled={!usuario || !termsAccepted || submitting} variant="success">
                <FontAwesomeIcon className="mr-2" icon={faLock} />
                {submitting ? 'Iniciando pago...' : 'Confirmar y realizar pago'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>

          </div>
        </div>
    </div>
  );
}

export default ComprarComponent;
