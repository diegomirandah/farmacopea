import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import LoginModel from '../../models/LoginModel';
import UsuarioModel from '../../models/UsuarioModel';
import LoginService from '../../services/LoginService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const loginService = new LoginService();

function RegisterComponent() {
  
    const [inputs, setInputs] = useState({
        usr_nombre: '',
        usr_pais: '',
        usr_ocupacion: '',
        usr_empresa: '',
        usr_id: '',
        log_email: '',
        log_contrasena: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setloginError] = useState({variant: false, error: ''});
    const { usr_nombre, usr_pais, usr_ocupacion, usr_empresa, usr_id, log_email, log_contrasena } = inputs;

    function handleChange(e) {
        const { name, value } = e.target;
        setloginError({variant: false, error: ''});
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (!usr_id && !log_email && !log_contrasena && !usr_nombre && !usr_pais && !usr_ocupacion && !usr_empresa) {
            return;
        }
        if (usr_id.length > 20 || log_email.length > 50 || log_contrasena.length > 12 || log_contrasena.length < 6 || usr_nombre.length > 50 || usr_pais.length > 25 || usr_ocupacion.length > 20 || usr_empresa.length > 20) {
            return;
        }else{
            setSubmitting(true);
            let login = new LoginModel(usr_id, log_email, log_contrasena, null, null, null);
            let usuario = new UsuarioModel(usr_id, usr_nombre, usr_pais, usr_ocupacion, usr_empresa);
            loginService.registrarse(login, usuario).then(res => {
                //console.log(res);
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
          <Form.Row>
            <FormGroup className="col-12 col-md-6">
                    <FormControl placeholder="N° Identificación" type="text" name="usr_id" value={usr_id} onChange={handleChange} className={( (submitted && !usr_id) || usr_id.length > 20 ? ' is-invalid' : '')}></FormControl>
                    <small className="form-text text-muted">
                    Ingrese el número de documento.
                    </small>
                    {submitted && !usr_id &&
                        <div className="invalid-feedback">Debe indicar su número de documento.</div>
                    }
                    {usr_id.length > 20 &&
                        <div className="invalid-feedback">Su número de documento no debe exceder los 20 caracteres.</div>
                    }
            </FormGroup>
            <FormGroup className="col-12 col-md-6">
                    <FormControl placeholder="Nombre completo" type="text" name="usr_nombre" value={usr_nombre} onChange={handleChange} className={( (submitted && !usr_nombre) || usr_nombre.length > 50 ? ' is-invalid' : '')}></FormControl>
                    <small className="form-text text-muted">
                    Ingrese su nombre completo.
                    </small>
                    {submitted && !usr_nombre &&
                        <div className="invalid-feedback">Debe indicar su nombre completo.</div>
                    }
                    {usr_nombre.length > 50 &&
                        <div className="invalid-feedback">Caracteres excedidos.</div>
                    }
            </FormGroup>
          </Form.Row>
          <Form.Row>
            <FormGroup className="col-12 col-md-4">
                    <FormControl placeholder="Ocupación" type="text" name="usr_ocupacion" value={usr_ocupacion} onChange={handleChange} className={((submitted && !usr_ocupacion) || usr_ocupacion.length > 20 ? ' is-invalid' : '')}></FormControl>
                    <small className="form-text text-muted">
                    Indique su ocupación.
                    </small>
                    {submitted && !usr_ocupacion &&
                        <div className="invalid-feedback">Debe indicar su ocupación.</div>
                    }
                    {usr_ocupacion.length > 20 &&
                        <div className="invalid-feedback">No debe superar los 20 caracteres.</div>
                    }
            </FormGroup>
            <FormGroup className="col-12 col-md-4">
                    <FormControl placeholder="Empresa" type="text" name="usr_empresa" value={usr_empresa} onChange={handleChange} className={((submitted && !usr_empresa) || usr_empresa.length > 20 ? ' is-invalid' : '')}></FormControl>
                    <small className="form-text text-muted">
                    Ingrese el nombre de su empresa.
                    </small>
                    {submitted && !usr_empresa &&
                        <div className="invalid-feedback">Debe indicar su número de documento.</div>
                    }
                    {usr_empresa.length > 20 &&
                        <div className="invalid-feedback">No debe superar los 20 caracteres.</div>
                    }
            </FormGroup>
            <FormGroup className="col-12 col-md-4">
                    <FormControl placeholder="País" type="text" name="usr_pais" value={usr_pais} onChange={handleChange} className={((submitted && !usr_pais) || usr_pais.length > 25 ? ' is-invalid' : '')}></FormControl>
                    <small className="form-text text-muted">
                    Indique el país al que pertenece.
                    </small>
                    {submitted && !usr_pais &&
                        <div className="invalid-feedback">Debes ingresar un país.</div>
                    }
                    {usr_pais.length > 25 &&
                        <div className="invalid-feedback">El campo no debe exceder los 25 caracteres.</div>
                    }
            </FormGroup>
          </Form.Row>
          <Form.Row>
            <FormGroup className="col-12 col-md-6">
                    <FormControl placeholder="Correo electrónico" type="email" name="log_email" value={log_email} onChange={handleChange} className={((submitted && !log_email) || log_email.length > 50 ? ' is-invalid' : '')}></FormControl>
                    <small className="form-text text-muted">
                    Indique su correo electrónico para su cuenta.
                    </small>
                    {submitted && !log_email &&
                        <div className="invalid-feedback">Debe ingresar su correo electrónico.</div>
                    }
                    {log_email.length > 50 &&
                        <div className="invalid-feedback">El correo electrónico no debe exceder los 50 caracteres.</div>
                    }
            </FormGroup>
            <FormGroup className="col-12 col-md-6">
                    <FormControl placeholder="Contraseña" type="password" name="log_contrasena" value={log_contrasena} onChange={handleChange} className={((submitted && !log_contrasena) || ((submitted && log_contrasena.length < 6) || log_contrasena.length > 12 ) ? ' is-invalid' : '')}></FormControl>
                    <small className="form-text text-muted">
                    Ingrese una contraseña segura.
                    </small>
                    {submitted && !log_contrasena &&
                        <div className="invalid-feedback">Debe ingresar su contraseña.</div>
                    }
                    {((submitted && (log_contrasena.length > 0 && log_contrasena.length < 6)) || log_contrasena.length > 12) &&
                        <div className="invalid-feedback">La contraseña debe tener entre 6 y 12 caracteres.</div>
                    }
            </FormGroup>
          </Form.Row>
          <FormGroup>
                {loginError.variant &&
                    <Alert variant={loginError.variant}>{loginError.error}</Alert>
                }
          </FormGroup>
          <FormGroup>
            <Button disabled={submitting} type="submit">
                <FontAwesomeIcon className="mr-2" icon={faUserPlus}/>
                {submitting ? 'Registrando...' : 'Registrarse'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </FormGroup>
      </Form>
    </div>
  );
}

export default RegisterComponent;