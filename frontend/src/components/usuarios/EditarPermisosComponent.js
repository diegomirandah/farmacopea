import React, { useState } from 'react';
import {Modal, Button, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faEdit } from '@fortawesome/free-solid-svg-icons';
import UsuariosService from '../../services/UsuariosService';
import LoginModel from '../../models/LoginModel';
import SessionService from '../../services/SessionService';
const sessionService = new SessionService();
const usuariosService = new UsuariosService();
function EditarPermisosComponent(props) {
  const [alert, setAlert] = useState({
    show: false,
    head: '',
    body: '',
    variant: 'danger'
  });
  const mi_id = sessionService.getUserData().login.usr_id;
  const isAdmin = sessionService.isAdmin();
  const handleShow = () => setShow(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalPermiso, setModalPermiso] = useState(false);
  const usr = props.usr.usuario;
  const login = props.usr.login;
  const handleChange = (e) => {
    handleShow();
    setModalPermiso(e.target.value);
    //console.log('modalpermiso '+e.target.value);
    //console.log('log_tipo '+login.log_tipo);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    let control = document.getElementById(usr.usr_id);
    control.value = login.log_tipo;
    setShow(false);
  };

  const cambiarPermisos = () => {
        setSubmitting(true);
        let log = new LoginModel(usr.usr_id, null, null, modalPermiso, null, null);
        usuariosService.cambiarTipoUsuario(log).then(resp => {
            console.log(resp);
            setShow(false);
            if(resp.status === 'OK'){
              setAlert({show: true, head: 'Éxito', body: resp.message, variant: 'success'});
            }
            if(resp.status === 'ERROR' || resp.status === 'FATAL'){
              setAlert({show: true, head: 'ERROR', body: resp.message, variant: 'danger'});
            }
            setTimeout(() => {setAlert({show: false, head: '', body: '', variant: 'danger'});}, 2000);
        }).catch(err => {
          setShow(false);
          setAlert({show: true, head: 'ERROR', body: 'Error de conexión con el servidor.', variant: 'danger'});
          setTimeout(() => {setAlert({show: false, head: '', body: '', variant: 'danger'});}, 2000);
        });
        
  };

  return (
        <>
        <select id={usr.usr_id} name={usr.usr_id} onChange={handleChange} className="form-control" 
          disabled={((login.log_tipo === 'gestorContenidosUsuarios' || usr.usr_id === mi_id) && !isAdmin) ? true : false} 
          defaultValue={login.log_tipo}>
                        <option value="cliente">Cliente</option>
                        <option value="gestorContenidos">Gestor de contenidos</option>
                        <option value="gestorUsuarios">Gestor de usuarios</option>
                        <option value="gestorContenidosUsuarios">Gestor de contenidos y usuarios</option>
                      </select>
                    
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title><FontAwesomeIcon style={{color: 'red'}} className="mr-2" icon={faExclamationTriangle}/>Cambiar permisos usuario</Modal.Title>
              </Modal.Header>
                <Modal.Body>Desea aplicar los permisos de <b>{modalPermiso === 'cliente' ? 'Cliente' : ''}
                    {modalPermiso === 'gestorContenidos' ? 'Gestor de Contenidos' : ''}
                    {modalPermiso === 'gestorUsuarios' ? 'Gestor de Usuarios' : ''}
                    {modalPermiso === 'gestorContenidosUsuarios' ? 'Gestor de Contenidos y Usuarios' : ''}</b> al usuario <i>{usr.usr_nombre}</i>?</Modal.Body>
              <Modal.Footer>
                <Button variant="default" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={cambiarPermisos}>
                    <FontAwesomeIcon className="mr-2" icon={faEdit} />
                    {submitting ? 'Cambiando permisos...' : 'Cambiar permisos'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
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

export default EditarPermisosComponent;
