import React, {useState} from 'react';
import { Alert, Button, Modal, Spinner } from 'react-bootstrap';
import UsuariosService from '../../services/UsuariosService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import SessionService from '../../services/SessionService';

const sessionService = new SessionService();
function EliminarUsuarioModalComponent(props) {
    
    const usuario = props.usr.usuario;
    const mi_id = sessionService.getUserData().login.usr_id;
    const [submitting, setSubmitting] = useState(false);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({
      show: false,
      head: '',
      body: '',
      variant: 'danger'
    });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const usuariosService = new UsuariosService();

    function eliminarUsuario() {
        setSubmitting(true);
        usuariosService.eliminarUsuario(usuario.usr_id).then(resp => {
            setShow(false);
            if(resp.status === 'OK'){
              setAlert({show: true, head: 'Éxito', body: resp.message, variant: 'success'});
              setTimeout(() => {document.location.href='/usuarios/revisar';}, 2000);
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
        {usuario.usr_id === mi_id ? ''
         : <Button className="ml-2" variant="danger" onClick={handleShow}>
            <FontAwesomeIcon className="mr-2" icon={faTrash} />Eliminar
          </Button>
        }
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><FontAwesomeIcon style={{color: 'red'}} className="mr-2" icon={faExclamationTriangle}/>Eliminar usuario seleccionado</Modal.Title>
          </Modal.Header>
            <Modal.Body>¿Desea eliminar el usuario <i>{usuario.usr_nombre}</i>? Las acciones son irreversibles.</Modal.Body>
          <Modal.Footer>
            <Button variant="default" onClick={handleClose}>
              Cancelar
            </Button>
            <Button disabled={submitting} variant="danger" onClick={eliminarUsuario}>
            <FontAwesomeIcon className="mr-2" icon={faTrash} />
            {submitting ? 'Eliminando usuario...' : 'Eliminar'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
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
export default EliminarUsuarioModalComponent;