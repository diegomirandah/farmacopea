import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import LoginModel from '../../models/LoginModel';
import LoginService from '../../services/LoginService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const loginService = new LoginService();

function LoginComponent() {
  
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setloginError] = useState({variant: false, error: ''});
    const { username, password } = inputs;

    function handleChange(e) {
        const { name, value } = e.target;
        setloginError({variant: false, error: ''});
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (username && password) {
            setSubmitting(true);
            let login = new LoginModel(null, username, password, null, null, null);
            loginService.iniciarSesion(login).then(res => {
                if(res.status === 'ERROR'){
                    setloginError({variant:'danger', error: res.message});
                }
                if(res.status === 'OK'){
                    setloginError({variant:'primary', error: res.message});
                }
                setSubmitting(false);
            }).catch(err => {
                setloginError({variant: 'danger', error: 'Error de conexión con el servidor.'});
                setSubmitting(false);
            });
            
        }
    }


  return (
    <div>
      <Form onSubmit={handleSubmit}>
          <FormGroup>
                <FormControl placeholder="N° Documento o correo electrónico" type="text" name="username" value={username} onChange={handleChange} className={(submitted && !username ? ' is-invalid' : '')}></FormControl>
                <small className="form-text text-muted">
                Puede ser su correo electrónico o su número de documento.
                </small>
                {submitted && !username &&
                    <div className="invalid-feedback">Debe indicar su correo electrónico.</div>
                }
          </FormGroup>
          <FormGroup>
                <FormControl placeholder="Contraseña" type="password" name="password" value={password} onChange={handleChange} className={(submitted && !username ? ' is-invalid' : '')}></FormControl>
                <small className="form-text text-muted">
                Ingrese su contraseña secreta.
                </small>
                {submitted && !password &&
                    <div className="invalid-feedback">Debe ingresar su contraseña.</div>
                }
          </FormGroup>
          <FormGroup>
                {!submitting && loginError.variant &&
                    <Alert variant={loginError.variant}>{loginError.error}</Alert>
                }
          </FormGroup>
          <FormGroup>
                <Link to="/recuperar-contrasena">
                  <small className="form-text text-primary">
                    ¿Olvidaste tu contraseña?
                    </small>
                </Link>
          </FormGroup>
          <FormGroup>
            <Button disabled={submitting} type="submit">
                <FontAwesomeIcon className="mr-2" icon={faSignInAlt}/>
                {submitting ? 'Iniciando sesión...' : 'Iniciar sesión'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </FormGroup>
      </Form>
    </div>
  );
}

export default LoginComponent;
