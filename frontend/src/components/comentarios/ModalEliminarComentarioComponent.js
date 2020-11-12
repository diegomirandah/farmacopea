import React, {useState} from 'react';
import { Alert, Button, Modal, Spinner } from 'react-bootstrap';
import ComentariosService from '../../services/ComentariosService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'


function ModalElimnarComentarioComponent(props) {
    
    const com_id = props.com_id;

    const [alert, setAlert] = useState({
      show: false,
      head: '',
      body: '',
      variant: 'danger'
    });

    const [submitting, setSubmitting] = useState(false);
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const comentariosService = new ComentariosService();

    function eliminarComentario() {
      setSubmitting(true);
        comentariosService.eliminarComentario(com_id).then(resp => {
            
            setShow(false);
            if(resp.status === 'OK'){
              setAlert({show: true, head: 'Éxito', body: resp.message, variant: 'success'});
              setTimeout(() => {document.location.href='/comentarios';}, 2000);
            }
            if(resp.status === 'ERROR' || resp.status === 'FATAL'){
              setAlert({show: true, head: 'ERROR', body: resp.message, variant: 'danger'});
            }
            setSubmitting(false);
            setTimeout(() => {setAlert({show: false, head: '', body: '', variant: 'danger'});}, 2000);
        }).catch(err => {
          setShow(false);
          setAlert({show: true, head: 'ERROR', body: 'Error de conexión con el servidor.', variant: 'danger'});
          setTimeout(() => {setAlert({show: false, head: '', body: '', variant: 'danger'});}, 2000);
          setSubmitting(false);
        });
    };

    return (
      <>
        <Button className="ml-2" variant="danger" onClick={handleShow}>
        <FontAwesomeIcon className="mr-2" icon={faTrash} />Eliminar comentario
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><FontAwesomeIcon style={{color: 'red'}} className="mr-2" icon={faExclamationTriangle}/>Eliminar comentario seleccionado</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Desea eliminar el comentario definitivamente? Las acciones son irreversibles.</Modal.Body>
          <Modal.Footer>
            <Button variant="default" onClick={handleClose}>
              Cancelar
            </Button>
            <Button disabled={submitting} variant="danger" onClick={eliminarComentario}>
              
            <FontAwesomeIcon className="mr-2" icon={faTrash} />
            {submitting ? 'Eliminando comentario...' : 'Eliminar'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container fixed-top bg-transparent">
              <div className="row justify-content-center">
                <Alert className="col-6" style={{zIndex: 1080}} show={alert.show} variant={alert.variant}>
                  <Alert.Heading>{alert.head}</Alert.Heading>
                  <p>{alert.body}</p>
              </Alert>
            </div>
          </div>
      </>
    );
  }
export default ModalElimnarComentarioComponent;
