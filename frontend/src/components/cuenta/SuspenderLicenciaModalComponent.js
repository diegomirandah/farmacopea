import React, {useState} from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faPause } from '@fortawesome/free-solid-svg-icons'
import LicenciasService from '../../services/LicenciasService';
const licenciasService = new LicenciasService();

function SuspenderLicenciaModalComponent(props) {

    const licencia = props.lic;
    const plan = props.plan;

    const [submitting, setSubmitting] = useState(false);
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    function suspenderLicencia() {
        setSubmitting(true);
        licenciasService.suspenderLicencia(licencia.lic_id).then(resp => {
          //console.log(resp);
          setSubmitting(true);
          setShow(false);
          document.location.href = '/cuenta/micuenta';
        });
    };

    return (
      <>
        <Button className="ml-3" variant="danger" onClick={handleShow}>
        <FontAwesomeIcon className="mr-2" icon={faPause} />Suspender licencia
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><FontAwesomeIcon style={{color: 'red'}} className="mr-2" icon={faExclamationTriangle}/>Suspender licencia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>La licencia seleccionada corresponde al plan {plan.plan_nombre}, el que tiene una duración de {plan.plan_duracion} meses y vence el {licencia.lic_fecha_expiracion}. Puedes 
            suspenderla para realizar la compra de una nueva licencia. Puedes también
            activarla nuevamente más tarde. Solo se permite el uso de una licencia activa
            a la vez.</p>
            <p>¿Desea continuar suspendiendo la licencia de todos modos?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="default" onClick={handleClose}>
              Cancelar
            </Button>
            <Button disabled={submitting} variant="danger" onClick={suspenderLicencia}>
            <FontAwesomeIcon className="mr-2" icon={faPause} />
            {submitting ? 'Suspendiendo...' : 'Suspender'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default SuspenderLicenciaModalComponent;