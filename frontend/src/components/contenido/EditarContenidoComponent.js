import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import { useLocation, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { Button, Form, FormGroup, FormControl, Spinner, Alert } from 'react-bootstrap';
import ContenidosService from '../../services/ContenidosService';
import ContenidoModel from '../../models/ContenidoModel';
import PlanesService from '../../services/PlanesService';
import SessionService from '../../services/SessionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import config from '../../config';
import ImagenesService from '../../services/ImagenesService';
import { FilePond } from 'react-filepond';
import ImagenModel from '../../models/ImagenModel';
import Skeleton from 'react-loading-skeleton';

const imagenesService = new ImagenesService();
const contenidosService = new ContenidosService();
const planesService = new PlanesService();
const sessionService = new SessionService();

function EditarContenidoComponent(props) {
  
  let location = useLocation();
  const nombreContenido = useParams().cont_nombre;

  const modules = {
    toolbar: [   [{ 'header': [1, 2, 3, false] }],['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],[{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'color': [] }, { 'background': [] }], [{ 'font': [] }],[{ 'align': [] }],['image']   ],
  };
  const formats = [
    'header','bold', 'italic', 'underline', 'strike', 'blockquote','list', 'bullet', 'indent','script', 'script','color', 'background',
    'font','align','image'
  ];

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  //const [contenido, setContenido] = useState(false);
  const [loading, setLoading] = useState(true);
  const [planes, setPlanes] = useState([]);
  const [value, setValue] = useState('');
  const [inputs, setInputs] = useState({  cont_nombre: '', cont_tipo: ''  });
  const { cont_nombre, cont_tipo } = inputs;
  const [imagenes, setImagenes] = useState([]);
  const [files, setFiles] = useState(false);
  const [error, setError] = useState({variant: false, error: ''});
  const cont_id = useParams().cont_id;

  useEffect( () => {
    //props.match.params.cont_nombre
    

    contenidosService.buscarContenido(nombreContenido).then( res => {
        if(res.status === 'OK' && res.data.length === 0){
          //setContenido(false);
        }else{
          let cont = new ContenidoModel();
          cont = res.data[0];
          //setContenido(cont);
          setInputs({  cont_nombre: cont.cont_nombre, cont_tipo: cont.cont_tipo  });
          setValue(cont.cont_descripcion);
        }
      });

      planesService.verPlanes().then(res => {
        let planesTotal = res.data; 
        let planesFinal = [];
        planesService.consultarPlanesContenido(cont_id).then(r => {
          let planesContenido = r.data;
          let control = true;
            
          planesTotal.forEach( (planT, index) => {
            control = true;
            planesContenido.forEach(planC => {
              //console.log(planT.plan_id + ' , ' + planC.plan_id);
              if(planT.plan_id === planC.plan_id){
                planesFinal.push({plan: planC, checked: true});
                control = false;
              }              
            });
            if(control){
              planesFinal.push({plan: planT, checked: false});
            }
          });
          //console.log(planesFinal);
          setPlanes(planesFinal);
          setLoading(false);
        });
      });

        
      imagenesService.imagenesContenido(location.cont_id).then(res => {
        setImagenes(res.data);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleCheckboxChange(e) {
    const { id } = e.target;
    let plan_id = Number(id);
    let p = [];
    planes.forEach((plan, index) => {
      if(index === plan_id){
          p.push({plan: plan.plan, checked: !plan.checked});
      }else{
        p.push({plan: plan.plan, checked: plan.checked});
      }
    });
    setPlanes(p);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setSubmitting(true);
    if(!value || !cont_nombre || !cont_tipo || cont_nombre.length > 50 || cont_tipo.length > 50){
      //setSubmitted(false);
      setSubmitting(false);
      console.log('tiene errores');
      return;  
    }
    console.log('editando');
    let contenido = new ContenidoModel(location.cont_id, new Date(), cont_nombre, value, cont_tipo);
    //console.log(contenido);

    contenidosService.actualizarContenido(contenido, sessionService.getUserData().login.usr_id).then(resp => {
      console.log(resp);
    });

    planes.forEach( plan => {
      //console.log(plan);
      if(plan.checked){
        planesService.agregarContenidoPlan(location.cont_id, plan.plan.plan_id);
        //console.log('agregar al plan ' + plan.plan.plan_nombre);
      }else{
        planesService.quitarContenidoPlan(location.cont_id, plan.plan.plan_id);
        //console.log('quitar del plan ' + plan.plan.plan_nombre);
      }
    });
    

        if(files){
          console.log('subiendo imagenes contenido...............');
          files.files.forEach(file => {
            //console.log(file.name);
            imagenesService.subirImagen(file).then(res => {
              console.log(res);
            });
            let imagen = new ImagenModel(null, location.cont_id, file.name);
            //console.log(imagen);
            
            imagenesService.agregarImagenContenido(imagen).then(res => { 
              setImagenes(imagenes => [...imagenes, imagen]);
            });
          });
        }
        setError({variant: 'success', error: 'Cambios guardados con éxito.'});
        setTimeout(() => {setError({variant: false, error: ''})}, 2000);
        setSubmitting(false);

  };

  return (
    <div className="container px-0 px-sm-3 py-0 py-sm-5">
    <div className="row justify-content-center pb-5">
 
    {loading && <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 mt-5">
    <Skeleton className="" height={40} count={1}/>
    <Skeleton className="mt-4" height={40} count={1}/>
    <Skeleton className="mt-4 mr-3" height={30} width={30} count={1}/>
    <Skeleton className="mr-3" height={30} width={100} count={1}/>
    <Skeleton className="mr-3" height={30} width={30} count={1}/>
    <Skeleton className="mr-3" height={30} width={100} count={1}/>
    <Skeleton className="mr-3" height={30} width={30} count={1}/>
    <Skeleton className="mr-3" height={30} width={100} count={1}/>
    <Skeleton className="mt-4" height={100} count={1}/>
    <Skeleton className="mt-4" height={300} count={1}/>
    <Skeleton className="my-4" width={150} height={40} count={1}/>
    </div>}
      
    {!loading && <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 mt-4 mt-sm-5">
      <h3>Editar Contenido</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl className={( (submitted && !cont_nombre) || cont_nombre.length > 50 ? ' is-invalid' : '')} disabled={submitting} value={cont_nombre} name="cont_nombre" onChange={handleChange} placeholder="Título del contenido" />
            <small className="form-text text-muted">
              Puede editar el título del contenido.
            </small>
            {submitted && !cont_nombre &&
                    <div className="invalid-feedback">Debe ingresar el nombre del contenido.</div>
              }
              {cont_nombre.length > 50 &&
                    <div className="invalid-feedback">Límite de caracteres excedidos.</div>
              }
          </FormGroup>
          <FormGroup>
            <FormControl className={((submitted && !cont_tipo) || cont_tipo.length > 50 ? ' is-invalid' : '')} disabled={submitting} value={cont_tipo} name="cont_tipo" onChange={handleChange} placeholder="Tipo de contenido" />
            <small className="form-text text-muted">
              Puede editar la categoría del contenido.
            </small>
            {submitted && !cont_tipo &&
                    <div className="invalid-feedback">Debe ingresar el tipo de contenido.</div>
              }
              {cont_tipo.length > 50 &&
                    <div className="invalid-feedback">Límite de caracteres excedidos.</div>
              }
          </FormGroup>
          <FormGroup>
            <Form.Label>Incluir contenido en los planes: </Form.Label>
            <small className="form-text text-muted">
              Seleccione o deseleccione las casillas para agregar o quitar el contenido de los planes disponibles.
            </small>
            <div>
              {planes && planes.map( (p, index) => (
                <label key={p.plan.plan_id} className="mr-3">
                  <input type="checkbox" disabled={submitting} id={index} checked={p.checked} onChange={handleCheckboxChange} /> <span className="label-text">{p.plan.plan_nombre}</span>
                </label>
                
              ))}
            </div>
            
          </FormGroup>
          <FormGroup className="row">
            {imagenes.length > 0 && imagenes.map(imagen => (
              <div className="col-3" key={imagen.ima_id}><img className="w-100" alt={imagen.ima_nombre} src={config.uploadsPath + '/' + imagen.ima_nombre}/></div>
            ))}
            {imagenes.length === 0 && <div className="col"><label>El contenido no posee imagenes actualmente. Puede subir algunas a continuación.</label></div>}
          </FormGroup>
          <FormGroup>
            <label>Subir imágenes</label>
            <small className="form-text text-muted">
              Puede subir imagenes opcionalmente. Se permite hasta un máximo de 3 imagenes.
            </small>
            <FilePond disabled={submitting} allowMultiple={true} maxFiles={3}   onupdatefiles={fileItems => {
                setFiles({
                    files: fileItems.map(fileItem => fileItem.file)
                })
            }}/>

          </FormGroup>
          <FormGroup>
            <ReactQuill className={(submitted && value === '' ? ' is-invalid' : '')} readOnly={submitting} theme="snow" rows={20} modules={modules} formats={formats} value={value} onChange={setValue}/>
            {submitted && value === '' &&
                    <div className="invalid-feedback">Debe proporcionar información acerca del contenido.</div>
              }
          </FormGroup>
          <FormGroup>
            {!submitting && error.variant &&
                <Alert variant={error.variant}>{error.error}</Alert>
            }
          </FormGroup>
          <FormGroup>
            <Button disabled={submitting} type="submit">
              <FontAwesomeIcon className="mr-2" icon={faSave} />
              {submitting ? 'Guardando cambios...' : 'Guardar cambios'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </FormGroup>
        </Form>
      </div>}
    </div>
    </div>
  );
}
export default EditarContenidoComponent;


