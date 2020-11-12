import React, {useState} from 'react';
import { Button, Form, FormGroup, FormControl, Alert, Spinner } from 'react-bootstrap';
import UsuariosService from '../../services/UsuariosService';
import UsuarioModel from '../../models/UsuarioModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import LoginModel from '../../models/LoginModel';
const usuariosService = new UsuariosService();

function AgregarUsuarioComponent() {

  const [error, setError] = useState({variant: false, error: ''});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({  
    usr_id: '',    
    usr_nombre: '',
    usr_pais: '',
    usr_empresa: '',
    usr_ocupacion: '',
    log_email: '',
    log_contrasena: '',
    log_recontrasena: '',
    log_tipo: ''
  });
  const { 
    usr_id,    
    usr_nombre,
    usr_pais,
    usr_empresa,
    usr_ocupacion,
    log_email,
    log_contrasena,
    log_recontrasena,
    log_tipo
  } = inputs;

 
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
        if (log_contrasena !== log_recontrasena) {
            return;
        }
        if (!usr_id || !log_email || !log_contrasena || !log_tipo || !usr_nombre) {
            return;
        }
        if (usr_id.length > 20 || log_email.length > 50 || log_contrasena.length > 12 || log_contrasena.length < 6 || usr_nombre.length > 50 || usr_pais.length > 25 || usr_ocupacion.length > 20 || usr_empresa.length > 20) {
            return;
        }else{
            setSubmitting(true);
            let usuario = new UsuarioModel(usr_id, usr_nombre, usr_pais, usr_ocupacion, usr_empresa);
            let login = new LoginModel(usr_id, log_email, log_contrasena, log_tipo, null, null);
            //console.log(usuario);
            //console.log(login);
            usuariosService.agregarUsuario(login, usuario).then(res => {
                console.log(res);
                if(res.status === 'OK'){
                    setError({variant: 'success', error: 'Usuario agregado con éxito.'});
                    setSubmitting(false);
                    setSubmitted(false);
                    setInputs({  
                        usr_id: '',    
                        usr_nombre: '',
                        usr_pais: '',
                        usr_empresa: '',
                        usr_ocupacion: '',
                        log_email: '',
                        log_contrasena: '',
                        log_recontrasena: '',
                        log_tipo: ''
                    });
                }
                if(res.status === 'ERROR'){
                    setError({variant: 'danger', error: res.message});
                    setSubmitting(false);
                    setSubmitted(false);
                }
            }).catch(err => {
                setError({variant: 'danger', error: 'Error de conexión.'});
                setSubmitting(false);
                setSubmitted(false);
            });
                
            
        }
    
  };

  
  return (
    <div className="container px-0 px-sm-3 pt-sm-3 pb-5">
    <div className="row justify-content-center pt-0 pt-sm-3 pb-3">
      <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-7 mt-sm-3">
        <h3 className="my-4">Agregar Usuario</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
          <FormGroup className="col-6">
            <FormControl disabled={submitting} value={usr_nombre} name="usr_nombre" onChange={handleChange} className={((submitted && !usr_nombre) || usr_nombre.length > 50 ? ' is-invalid' : '')}  placeholder="Nombre" />
            <small className="form-text text-muted">
              Ingrese el nombre del nuevo usuario.
            </small>
            {submitted && !usr_nombre &&
                <div className="invalid-feedback">Debe ingresar un nombre.</div>
            }
            {usr_nombre.length > 50 &&
                <div className="invalid-feedback">El nombre no debe exceder los 50 caracteres.</div>
            }
          </FormGroup>
          <FormGroup className="col-6">
            <FormControl disabled={submitting} value={usr_id} name="usr_id" onChange={handleChange} className={((submitted && !usr_id) || usr_id.length > 50 ? ' is-invalid' : '')} placeholder="N° Identificación" />
            <small className="form-text text-muted">
              Ingrese RUN o N° Identificación del nuevo usuario.
            </small>
            {submitted && !usr_id &&
                <div className="invalid-feedback">Debe ingresar un número de identificación.</div>
            }
            {usr_id.length > 50 &&
                <div className="invalid-feedback">El número no debe exceder los 50 caracteres.</div>
            }
          </FormGroup>
          <FormGroup className="col-12">
            <FormControl disabled={submitting} value={log_email} type="email" name="log_email" onChange={handleChange} className={((submitted && !log_email) || log_email.length > 50 ? ' is-invalid' : '')} placeholder="Correo electrónico" />
            <small className="form-text text-muted">
              Ingrese un correo electrónico para el nuevo usuario.
            </small>
            
            {submitted && !log_email &&
                <div className="invalid-feedback">Debe ingresar su correo electrónico.</div>
            }
            {log_email.length > 50 &&
                <div className="invalid-feedback">El correo electrónico no debe exceder los 50 caracteres.</div>
            }
          </FormGroup>
          <FormGroup className="col-12">
            <Form.Control disabled={submitting} name="log_tipo" onChange={handleChange} className={(submitted && log_tipo === '' ? ' is-invalid' : '')} as="select">
                <option value="" disabled selected hidden>Tipo de usuario</option>
                <option value="gestorContenidos">Gestor de contenidos</option>
                <option value="gestorUsuarios">Gestor de usuarios</option>
                <option value="gestorContenidosUsuarios">Gestor de contenidos y usuarios</option>
            </Form.Control>
            {submitted && !log_tipo &&
                <div className="invalid-feedback">Debe seleccionar un tipo de usuario.</div>
            }
          </FormGroup>
          <FormGroup className="col-6">
            <FormControl disabled={submitting} value={log_contrasena} type="password" name="log_contrasena" onChange={handleChange} className={((submitted && !log_contrasena) || ((submitted && log_contrasena.length < 6) || log_contrasena.length > 12 ) ? ' is-invalid' : '')} placeholder="Contrasena" />
            <small className="form-text text-muted">
              Ingrese una contraseña entre 6 y 12 caracteres.
            </small>
            {submitted && !log_contrasena &&
                <div className="invalid-feedback">Debe ingresar su contraseña.</div>
            }
            {((submitted && (log_contrasena.length > 0 && log_contrasena.length < 6)) || log_contrasena.length > 12) &&
                <div className="invalid-feedback">La contraseña no cumple con los requisitos.</div>
            }
          </FormGroup>
          <FormGroup className="col-6">
            <FormControl disabled={submitting} value={log_recontrasena} type="password" name="log_recontrasena" onChange={handleChange} className={((submitted && !log_recontrasena) || (submitted && (log_contrasena !== log_recontrasena)) ? ' is-invalid' : '')} placeholder="Repita contrasena" />
            <small className="form-text text-muted">
              Confirme la contraseña ingresada anteriormente.
            </small>
            {submitted && (log_contrasena !== log_recontrasena) &&
                <div className="invalid-feedback">Las contraseñas deben coincidir.</div>
            }
          </FormGroup>
          <FormGroup className="col-12">
            {!submitting && error.variant &&
                <Alert variant={error.variant}>{error.error}</Alert>
            }
          </FormGroup>
          <FormGroup className="col-12">
            <Button disabled={submitting} type="submit">
              <FontAwesomeIcon className="mr-2" icon={faUserPlus} />
              {submitting ? 'Agregando usuario...' : 'Agregar usuario'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </FormGroup>
          </Form.Row>
        </Form>
      </div>
    </div>
    </div>
  );
  
}
export default AgregarUsuarioComponent;

