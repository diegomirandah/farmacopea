import React, { useState } from 'react';
import { Form, FormGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import ComentarioModel from '../../models/ComentarioModel';
import SessionService from '../../services/SessionService';
import ComentariosService from '../../services/ComentariosService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const comentariosService = new ComentariosService();
const sessionService = new SessionService();

function AgregarComentarioComponent(props) {
  
    const [comentario, setComentario] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState({variant: false, error: ''});

    function handleChange(e) {
        const { value } = e.target;
        setError({variant: false, error: ''});
        setComentario(value);
    }


    async function handleSubmit(e) {
        e.preventDefault();
        if(comentario.length > 500){
            return;
        }
        setSubmitted(true);
        if (comentario) {
            setSubmitting(true);
            //console.log(props);
            //console.log('enviando comentario cont_id=');
            let com = new ComentarioModel(null, new Date(), comentario, null, sessionService.getUserData().login.usr_id, props.cont_id);
            comentariosService.comentarContenido(com).then(res => {
                if(res.status === 'ERROR'){
                    setError({variant:'danger', error: res.message});
                }
                if(res.status === 'OK'){
                    setError({variant:'primary', error: res.message});
                    document.location.reload();
                }
                setSubmitting(false);
            }).catch(err => {
                setError({variant: 'danger', error: 'Error de conexión con el servidor.'});
                setSubmitting(false);
                setSubmitted(false);
            });
            
        }
    }


  return (
      <div className="row border-top pt-3">
    <div className="col-8">
      <Form onSubmit={handleSubmit}>
          <FormGroup>
                <label className="lead">Agregar comentario</label>
                <p><small>Puedes dejarnos un comentario, sugerencia o recomendación para este contenido.</small></p>
                <FormControl as="textarea" rows="3" type="text" name="comentario" value={comentario} onChange={handleChange} className={((submitted && !comentario) || (comentario.length > 500) ? ' is-invalid' : '')}></FormControl>
                {submitted && !comentario &&
                    <div className="invalid-feedback">Debe ingresar un comentario antes de enviarlo.</div>
                }
                {comentario.length > 500 &&
                    <div className="invalid-feedback">Límite de caracteres excedido.</div>
                }
                <small>{comentario.length} / 500</small>
          </FormGroup>
          <FormGroup>
                {!submitting && error.variant &&
                    <Alert variant={error.variant}>{error.error}</Alert>
                }
          </FormGroup>
          <FormGroup>
            <Button disabled={!comentario || submitting} type="submit">
               <FontAwesomeIcon className="mr-2" icon={faSave} />  
                {submitting ? 'Enviando comentario...' : 'Enviar comentario'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </FormGroup>
      </Form>
    </div>
    </div>
  );
}

export default AgregarComentarioComponent;
