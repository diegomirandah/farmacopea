import React, {useState} from 'react';
import { Button, Form, FormGroup, FormControl, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons';
import LoginService from '../../services/LoginService';
import { Link } from 'react-router-dom';
const loginService = new LoginService();
function RecuperarContrasenaComponent() {
  
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState({variant: false, error: ''});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { value } = e.target;
    setError({variant: false, error: ''});
    setCorreo(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    //console.log(correo);
    loginService.recuperarContrasena(correo).then(res => {
          console.log(res);
          if(res.status === 'OK'){
            setError({variant: 'success', error: 'Contraseña restablecida, compruebe su correo electrónico.'});
            setCorreo('');
          }
          if(res.status === 'ERROR'){
            setError({variant: 'danger', error: 'Compruebe que el correo se encuentra registrado en el sistema.'});
          }
          setSubmitting(false);
      }).catch(err => {
          setError({variant: 'danger', error: 'Error de conexión.'});
          setSubmitting(false);
      });   
  };

  

  return (
    <div className="container px-0 px-sm-3 pt-0 pt-md-3 pb-md-5">
    <div className="row justify-content-center pt-md-3 pb-md-5">
      <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-7 mt-2 mb-4 mb-sm-5 mt-sm-5">
        <h3 className="my-4">Recuperar mi contraseña</h3>
        <p className="text-justify">¿Olvidaste tu contraseña? Para restablecer tu contraseña ingresa tu correo electrónico a continuación. Se generará una contraseña temporal, la que será enviada al correo indicado.</p>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
          <FormGroup className="col-12">
            <FormControl type="email" disabled={submitting} value={correo} onChange={handleChange} placeholder="Ej: correo@dominio.cl" />
            <small className="form-text text-muted">
              Ingrese correo electrónico.
            </small>
          </FormGroup>
          <FormGroup className="col-12">
            {!submitting && error.variant &&
                <Alert variant={error.variant}>{error.error}</Alert>
            }
          </FormGroup>
          <FormGroup className="col-12">
                <Link to="/login">
                  <small className="form-text text-primary">
                    Volver a iniciar sesión
                    </small>
                </Link>
          </FormGroup>
          <FormGroup className="col-12">
            <Button disabled={submitting || correo.length <=2} type="submit">
              <FontAwesomeIcon className="mr-2" icon={faKey} />
              {submitting ? 'Recuperando contraseña...' : 'Recuperar contraseña'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </FormGroup>
          </Form.Row>
        </Form>
      </div>
    </div>
    </div>
  );
}
export default RecuperarContrasenaComponent;

