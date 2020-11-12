import React, {useState, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Form, FormGroup, FormControl, Alert, Spinner } from 'react-bootstrap';
import ContenidosService from '../../services/ContenidosService';
import ContenidoModel from '../../models/ContenidoModel';
import PlanesService from '../../services/PlanesService';

// Import React FilePond
import { FilePond } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import ImagenesService from '../../services/ImagenesService';
import ImagenModel from '../../models/ImagenModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'



const contenidosService = new ContenidosService();
const planesService = new PlanesService();

function AgregarContenidoComponent() {
  
  const modules = {
    toolbar: [   [{ 'header': [1, 2, 3, false] }],['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],[{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'color': [] }, { 'background': [] }], [{ 'font': [] }],[{ 'align': [] }],['image']   ],
  };
  const formats = [
    'header','bold', 'italic', 'underline', 'strike', 'blockquote','list', 'bullet', 'indent','script', 'script','color', 'background',
    'font','align','image'
  ];

  const [planes, setPlanes] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState({variant: false, error: ''});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({  cont_nombre: '', cont_tipo: '', imagenes: []  });
  const { cont_nombre, cont_tipo } = inputs;

  useEffect( () => {
    planesService.verPlanes().then(res => { 
      res.data.forEach(plan => {
        setPlanes(planes => [...planes, {plan: plan, checked: false}]);
      });      
    });

  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }


  const imagenesService = new ImagenesService();
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
  const [files, setFiles] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitted(true);
    if(!value || !cont_nombre || !cont_tipo || cont_nombre.length > 50 || cont_tipo.length > 50){
      //setSubmitted(false);
      setSubmitting(false);
      
      return;  
    }
    let contenido = new ContenidoModel(null, new Date(), cont_nombre, value, cont_tipo);
    console.log('subiendo contenido...............');
    //console.log(contenido);
    contenidosService.agregarContenido(contenido).then(res => {
      if(res.status === 'OK'){
        let cont_id = res.data.insertId;
        
        //console.log('agregando contenido a planes.............');
        planes.forEach(p => {
          if(p.checked){
            planesService.agregarContenidoPlan(cont_id, p.plan.plan_id);
          }
        });


       

        //console.log(files.length);

        if(files){
          //console.log('subiendo imagenes contenido...............');
          files.files.forEach(file => {
            //console.log(file.name);
            imagenesService.subirImagen(file).then(res => {
              console.log(res);
            });
            let imagen = new ImagenModel(null, cont_id, file.name);
            imagenesService.agregarImagenContenido(imagen).then(res => { console.log(res);});
          });
        }
        setError({variant: 'success', error: 'Contenido agregado con éxito.'});
        setSubmitting(false);
   
      }
    });
  };

  

  return (
    <div className="container px-0 px-sm-3 pt-0 pt-sm-3 pb-5">
    <div className="row justify-content-center pb-sm-5">
      <div className="col-12 col-sm-11 col-md-10 col-lg-9 col-xl-8 mt-sm-3">
        <h3 className="my-4">Agregar Contenido</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl className={( (submitted && !cont_nombre) || cont_nombre.length > 50 ? ' is-invalid' : '')} disabled={submitting} value={cont_nombre} name="cont_nombre" onChange={handleChange} placeholder="Título del contenido" />
            <small className="form-text text-muted">
              Ingrese el título del contenido que desea agregar.
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
              Ingrese una categoría a la que pertenece. Se agregará automáticamente al menú de contenidos.
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
            <div>
              {planes && planes.map( (p, index) => (
                <label key={p.plan.plan_id} className="mr-3">
                  <input disabled={submitting} type="checkbox" id={index} checked={p.checked} onChange={handleCheckboxChange} /> <span className="label-text">{p.plan.plan_nombre}</span>
                </label>
              ))}
            </div>
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
            <small className="form-text text-muted">
              Ingrese aquí la información del contenido. Dispone de un editor de texto el que almacenará la información y el formato de esta, de manera
              que luego, el contenido se visualizará al igual que en el cuadro.
            </small>
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
              {submitting ? 'Agregando contenido...' : 'Agregar contenido'} {submitting && <Spinner animation="border" variant="light" size="sm" />}
            </Button>
          </FormGroup>
        </Form>
      </div>
    </div>
    </div>
  );
}
export default AgregarContenidoComponent;

