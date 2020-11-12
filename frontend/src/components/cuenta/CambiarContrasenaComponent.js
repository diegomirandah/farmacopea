import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, FormControl, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons';
import LoginModel from '../../models/LoginModel';
import SessionService from '../../services/SessionService';
import LoginService from '../../services/LoginService';
const loginService = new LoginService();
const sessionService = new SessionService();
function CambiarContrasenaComponent() {
  const [usuario, setUsuario] = useState(false);
  const [error, setError] = useState({variant: false, error: ''});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({  
    log_contrasena: '',
    log_recontrasena: ''
  });
  const { 
    log_contrasena,
    log_recontrasena
  } = inputs;

  useEffect( () => {
    setUsuario(sessionService.getUserData());
}, []);

 
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
        if (!log_contrasena || !log_recontrasena) {
            return;
        }
        if (log_contrasena.length > 12 || log_contrasena.length < 6) {
            return;
        }else{
            setSubmitting(true);
            let login = new LoginModel(usuario.usuario.usr_id, null, log_contrasena, null, null, null);
            //console.log(login);
            loginService.cambiarContrasena(login).then(res => {
                //console.log(res);
                if(res.status === 'OK'){
                    setError({variant: 'success', error: 'Contraseña actualizada con éxito.'});
                    setSubmitting(false);
                    setSubmitted(false);
                    setInputs({  
                        log_contrasena: '',
                        log_recontrasena: ''
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
    <div className="container px-0 px-sm-3 pt-0 pt-md-3 pb-md-5">
    <div className="row justify-content-center pt-md-3 pb-md-5">
      <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-7 mt-2 mb-4 mb-sm-5 mt-sm-5">
        <h3 className="my-4">Cambiar contraseña</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
          <FormGroup className="col-12">
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
          <FormGroup className="col-12">
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
              <FontAwesomeIcon className="mr-2" icon={faKey} />
              {submitting ? 'Modificando contraseña...' : 'Modificar contraseña'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </FormGroup>
          </Form.Row>
        </Form>
      </div>
    </div>
    </div>
  );
}
export default CambiarContrasenaComponent;

