import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import LoginModel from '../../models/LoginModel';
import UsuarioModel from '../../models/UsuarioModel';
import UsuariosService from '../../services/UsuariosService';
import SessionService from '../../services/SessionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons';

const usuariosService = new UsuariosService();
const sessionService = new SessionService();
function ActualizarDatosComponent() {
  
    const [inputs, setInputs] = useState({
        usr_nombre: '',
        usr_pais: '',
        usr_ocupacion: '',
        usr_empresa: '',
        usr_id: '',
        log_email: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setloginError] = useState({variant: false, error: ''});
    const { usr_nombre, usr_pais, usr_ocupacion, usr_empresa, usr_id, log_email } = inputs;

    useEffect( () => {
        usuariosService.buscarUsuario(sessionService.getUserData().login.usr_id).then(resp => {
            setInputs({
                usr_nombre: resp.data.usuario.usr_nombre,
                usr_pais: resp.data.usuario.usr_pais,
                usr_ocupacion: resp.data.usuario.usr_ocupacion,
                usr_empresa: resp.data.usuario.usr_empresa,
                usr_id: resp.data.usuario.usr_id,
                log_email: resp.data.login.log_email
            });
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setloginError({variant: false, error: ''});
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (!usr_id && !log_email && !usr_nombre && !usr_pais && !usr_ocupacion && !usr_empresa) {
            return;
        }
        if (usr_id.length > 20 || log_email.length > 50 || usr_nombre.length > 50 || usr_pais.length > 25 || usr_ocupacion.length > 20 || usr_empresa.length > 20) {
            return;
        }else{
            setSubmitting(true);
            let login = new LoginModel(usr_id, log_email, null, null, null, null);
            let usuario = new UsuarioModel(usr_id, usr_nombre, usr_pais, usr_ocupacion, usr_empresa);
            console.log(login);
            console.log(usuario);
            usuariosService.actualizarDatosUsuario(usuario, login).then(res => {
                console.log(res);
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
    <div className="container px-0 px-sm-3 py-md-5">
      <div className="row justify-content-center">
      {loading && 
      <div className="col-12 py-5 text-center">
        <Spinner animation="border" variant="primary" size="md" />
      </div>
      }
      {!loading && <Form className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8" onSubmit={handleSubmit}>
        <h3 className="my-4">Actualizar mis datos</h3>
          <Form.Row>
            <FormGroup className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <label>Número documento</label>
                    <FormControl type="text" disabled={submitting} name="usr_id" value={usr_id} onChange={handleChange} className={( (submitted && !usr_id) || usr_id.length > 20 ? ' is-invalid' : '')}></FormControl>
                    {submitted && !usr_id &&
                        <div className="invalid-feedback">Debe indicar su número de documento.</div>
                    }
                    {usr_id.length > 20 &&
                        <div className="invalid-feedback">Su número de documento no debe exceder los 20 caracteres.</div>
                    }
            </FormGroup>
            <FormGroup className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <label>Nombre completo</label>
                    <FormControl type="text" name="usr_nombre" disabled={submitting} value={usr_nombre} onChange={handleChange} className={( (submitted && !usr_nombre) || usr_nombre.length > 50 ? ' is-invalid' : '')}></FormControl>
                    {submitted && !usr_nombre &&
                        <div className="invalid-feedback">Debe indicar su nombre completo.</div>
                    }
                    {usr_nombre.length > 50 &&
                        <div className="invalid-feedback">Caracteres excedidos.</div>
                    }
            </FormGroup>
          </Form.Row>
          <Form.Row>
            <FormGroup className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <label>Ocupación</label>
                    <FormControl type="text" name="usr_ocupacion" disabled={submitting} value={usr_ocupacion} onChange={handleChange} className={((submitted && !usr_ocupacion) || usr_ocupacion.length > 20 ? ' is-invalid' : '')}></FormControl>
                    {submitted && !usr_ocupacion &&
                        <div className="invalid-feedback">Debe indicar su ocupación.</div>
                    }
                    {usr_ocupacion.length > 20 &&
                        <div className="invalid-feedback">No debe superar los 20 caracteres.</div>
                    }
            </FormGroup>
            <FormGroup className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <label>Empresa</label>
                    <FormControl type="text" name="usr_empresa" disabled={submitting} value={usr_empresa} onChange={handleChange} className={((submitted && !usr_empresa) || usr_empresa.length > 20 ? ' is-invalid' : '')}></FormControl>
                    {submitted && !usr_empresa &&
                        <div className="invalid-feedback">Debe indicar su número de documento.</div>
                    }
                    {usr_empresa.length > 20 &&
                        <div className="invalid-feedback">No debe superar los 20 caracteres.</div>
                    }
            </FormGroup>
            <FormGroup className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <label>País</label>
                    <FormControl type="text" name="usr_pais" disabled={submitting} value={usr_pais} onChange={handleChange} className={((submitted && !usr_pais) || usr_pais.length > 25 ? ' is-invalid' : '')}></FormControl>
                    {submitted && !usr_pais &&
                        <div className="invalid-feedback">Debes ingresar un país.</div>
                    }
                    {usr_pais.length > 25 &&
                        <div className="invalid-feedback">El campo no debe exceder los 25 caracteres.</div>
                    }
            </FormGroup>
          </Form.Row>
          <Form.Row>
            <FormGroup className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <label>Correo electrónico</label>
                    <FormControl type="email" name="log_email" disabled={submitting} value={log_email} onChange={handleChange} className={((submitted && !log_email) || log_email.length > 50 ? ' is-invalid' : '')}></FormControl>
                    {submitted && !log_email &&
                        <div className="invalid-feedback">Debe ingresar su correo electrónico.</div>
                    }
                    {log_email.length > 50 &&
                        <div className="invalid-feedback">El correo electrónico no debe exceder los 50 caracteres.</div>
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
                <FontAwesomeIcon className="mr-2" icon={faSave} />  
                {submitting ? 'Guardando cambios...' : 'Guardar cambios'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </FormGroup>
      </Form>}
      </div>
    </div>
  );
}

export default ActualizarDatosComponent;