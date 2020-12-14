import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCommentDots } from '@fortawesome/free-solid-svg-icons'
import UsuarioModel from '../../models/UsuarioModel';
import LoginModel from '../../models/LoginModel';
import ContenidoModel from '../../models/ContenidoModel';
import ComentarioModel from '../../models/ComentarioModel';
import ComentariosService from '../../services/ComentariosService';
const comentariosService = new ComentariosService();

function ModalVerComentarioComponent(props) {

    
    const com = props.com;

    let usuario = new UsuarioModel(com.usuario.usr_id, com.usuario.usr_nombre, com.usuario.usr_pais,com.usuario.usr_ocupacion, com.usuario.usr_empresa);
    let login = new LoginModel(com.login.usr_id, com.login.log_email, null, com.login.log_tipo, com.login.log_token, com.login.log_expiracion);
    let comentario = new ComentarioModel(com.comentario.com_id, new Date(com.comentario.com_fecha_creacion).toLocaleString('es-CL'), com.comentario.com_comentario, com.comentario.com_estado, com.comentario.usr_id, com.comentario.cont_id);
    let contenido = new ContenidoModel(null, null, com.contenido.cont_nombre, null, com.contenido.cont_tipo);
      
    const [pendiente, setPendiente] = useState(com.comentario.com_estado === 'pendiente' ? true : false);
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(comentario.com_id);
        comentariosService.marcarComentarioComoVisto(comentario.com_id).then(res => {
            if(res.status === 'OK' && res.code === 200){
                setPendiente(false);
                //console.log(resp);
            }
            
        });
        setShow(true);
    };

  
    return (
      <>
        <button onClick={handleShow} className="btn btn-default text-truncate text-left" style={{width: '100%'}}>
            {pendiente ? <span id={"tabla-comentarios-com-id-" + comentario.com_id} className="font-weight-bold">{comentario.com_comentario}</span> : <span>{comentario.com_comentario}</span>}
        </button>

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><FontAwesomeIcon style={{color: 'green'}} className="mr-2" icon={faCommentDots}/>Detalles comentario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>
                Comentario realizado por: {usuario.usr_nombre}<br/>
                Contenido comentado: {contenido.cont_nombre}<br/>
                Correo electrónico: {login.log_email}<br/>
                Fecha: {comentario.com_fecha_creacion}<br/>
                Comentario: <br/><br/>{com.comentario.com_comentario}
              </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="default" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default ModalVerComentarioComponent;
