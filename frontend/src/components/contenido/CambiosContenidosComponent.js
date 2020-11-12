import React, { useState,useEffect } from 'react';
import { Spinner, Table, Button, Modal } from 'react-bootstrap';
import ContenidosService from '../../services/ContenidosService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const contenidosService = new ContenidosService();

function CambiosContenidosComponent(props) {
    
    const [contenidoActual, setContenidoActual] = useState(false);
    const [cambios, setCambios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (index) => {
        setContenidoActual(false);
        //console.log(cambios[index].cambio.cont_id);
        contenidosService.consultarContenidosPorId(cambios[index].cambio.cont_id).then(resp => {
            //console.log(resp);
            setContenidoActual(resp.data);
        });
        setShow(true);
    };

    useEffect( () => {
        contenidosService.verCambiosContenidos().then(resp => {
            //console.log(resp);
            resp.data.forEach( (cambio, index) => {
                cambio.cambio.cam_fecha_modificacion = new Date(cambio.cambio.cam_fecha_modificacion).toLocaleString('es-CL');
                setCambios(cambios => [...cambios, cambio]); 
            });
            
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container px-0 px-sm-3 py-sm-5">
        <div className="row pt-3">
            <div className="col-12">
                <h4><b>Cambios de contenido</b></h4>
                <p>Aquí puedes revisar los cambios recientes que se hayan realizado a los contenidos. La lista
                    muestra los contenidos antes de ser editados.
                </p>
            </div>
        </div>
        <hr/>
        <div className="row py-3">
            <div className="col-12 table-cambios">
                <h6>Cambios realizados en contenidos</h6>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <td>N° Cambio</td>
                            <td>Nombre modificado</td>
                            <td>Editado por</td>
                            <td>Editado el</td>
                            <td>Contenido</td>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {loading &&
                        <tr><td className="text-center" colSpan="5"><Spinner animation="border" variant="primary" size="md" /></td></tr>
                    }
                    
                    {!loading && cambios.length === 0 && 
                        <tr><td className="text-center" colSpan="5">No se ha editado ningún contenido aún.</td></tr>
                    }
                    
                    {!loading && cambios.length > 0 && cambios.map( (c, index) => (
                    <tr key={index}>
                        <td>{c.cambio.cam_id}</td>
                        <td>{c.cambio.cam_nombre}</td>
                        <td>{c.login.log_email}</td>
                        <td>{c.cambio.cam_fecha_modificacion}</td>
                        <td><Button variant="default" onClick={() => {setIndex(index); handleShow(index)}}>Ver cambios<FontAwesomeIcon className="ml-2" icon={faEye}/></Button></td>
                    </tr>
                    ))}
                    
                    </tbody>
                </Table>

  
                {cambios.length > 0 &&
                <Modal size="lg" className="modal-cambios" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cambios de contenido</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">    
                            <div className="col-12 col-lg-6">
                                {!contenidoActual && 
                                    <div className="py-5 text-center"><Spinner animation="border" variant="primary" size="md" /></div>
                                }
                                {contenidoActual && <>
                                    <p><b>Contenido editado</b>  el {cambios[index].cambio.cam_fecha_modificacion}</p>
                                    <p>{contenidoActual.cont_nombre}</p>
                                    <div dangerouslySetInnerHTML={{__html: contenidoActual.cont_descripcion}}>
                                    </div>
                                </>}
                            </div>
                            <div className="col-12 col-lg-6">
                                <hr className="d-block d-lg-none"/>
                                <p><b>Contenido anterior</b></p>
                                <p>{cambios[index].cambio.cam_nombre}</p>
                                <div dangerouslySetInnerHTML={{__html: cambios[index].cambio.cam_descripcion}}>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Cerrar
                    </Button>
                    
                    </Modal.Footer>
                </Modal>       
                }

            </div>
        </div>
        </div>
        );
}

export default CambiosContenidosComponent;
