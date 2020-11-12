import React, { useState,useEffect } from 'react';
import ComentariosService from '../../services/ComentariosService';
import ComentarioModel from '../../models/ComentarioModel';
import { Spinner, Table } from 'react-bootstrap';
import ModalVerComentarioComponent from './ModalVerComentarioComponent';
import ModalEliminarComentarioComponent from './ModalEliminarComentarioComponent';

const comentariosService = new ComentariosService();
function ComentariosListComponent(props) {
  
  const [comentarios, setComentarios] = useState([]);
  const [comentariosSeleccionados, setComentariosSeleccionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estadoMarcado, setEstadoMarcado] = useState(false);
  //console.log(comentarios.length);
  
  useEffect( () => {
    //console.log(props);
    comentariosService.consultarComentarios().then(res => {  
      //console.log(res);  
      if(res.status === 'OK' && res.data.length > 0){
          let comentariosTable = [];
          
          res.data.forEach((com, index) => {
                let comentario = new ComentarioModel(com.comentario.com_id, new Date(com.comentario.com_fecha_creacion).toLocaleString('es-CL'), com.comentario.com_comentario, com.comentario.com_estado, com.comentario.usr_id, com.comentario.cont_id);
                
                comentariosTable.push(<tr key={com.comentario.com_id}>
                        <td><input onClick={seleccionarFila} disabled={estadoMarcado} index={index} type="checkbox" className="checkbox-comentarios" /></td>
                        <td className="text-truncate" style={{maxWidth: '150px'}}><ModalVerComentarioComponent checked={comentariosSeleccionados[index]} com={com} /></td>
                        <td>{comentario.com_fecha_creacion}</td>
                        <td><ModalEliminarComentarioComponent com_id={com.comentario.com_id}/></td>
                </tr>);
                
                //setComentarios(comentarios => [...comentarios, {comentario: comentario, usuario: usuario}]);
                //console.log(comentario);
                
            });
            setComentarios(comentariosTable);
        
        }
        //console.log(comentarios);
        setLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function seleccionarFila (e) 
  {
    //console.log(e.target.checked);
    setEstadoMarcado(false);
    let comSel = comentariosSeleccionados;
    
    
    
    if(e.target.checked){
      comSel.push(e.target.getAttribute('index'));
      setComentariosSeleccionados(comSel);
      //console.log(comSel);
      //console.log(e.target.getAttribute('index'));
    }else{
      var i = comSel.indexOf( e.target.getAttribute('index') );
 
      if ( i !== -1 ) {
          comSel.splice( i, 1 );
      }
      setComentariosSeleccionados(comSel);
      //console.log(comSel);

    }
  };

  function marcarLeidos(e){
    //console.log(comentariosSeleccionados);
    if(comentariosSeleccionados.length > 0){
        comentariosSeleccionados.forEach(index => {
        //console.log('marcar como leido el comentario numero => ' + comentarios[index].key);
        
        comentariosService.marcarComentarioComoVisto(comentarios[index].key).then(res => {
          if(res.status === 'OK' && res.code === 200){
            let fila = document.getElementById('tabla-comentarios-com-id-' + comentarios[index].key);
            try{
              fila.classList.remove('font-weight-bold');
            }catch(e){
              //console.log(e.message);
            }
          }
        });
      });
    }  
    
  
  }

  function marcarTodos(e){
    var list = document.querySelectorAll( '.checkbox-comentarios' );
    for (var item of list) {
      if(e.target.checked){
        item.checked = true;
        setEstadoMarcado(true);
      }else{
        item.checked = false;
        setEstadoMarcado(false);
      }
    }
    let comSel = comentariosSeleccionados; 
    for(var i=0; i<comentarios.length; i++){
      if(e.target.checked)
        comentariosSeleccionados.push(String(i));
      else
        comSel = [];  
    }
    setComentariosSeleccionados(comSel);
    
  }
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h5>Comentarios</h5>
          <p>Aquí se muestran los comentarios realizados por los clientes o por otros usuarios administradores del sistema.</p>
        </div>
          <div className="col-12 table-comentarios">
                {comentarios.length > 0 && <button onClick={marcarLeidos} className="text-primary" style={{cursor: 'pointer', border: 'none', background: 'transparent'}}><u>Marcar seleccionados como leído</u></button>}
                <Table className="mt-2" striped bordered hover responsive>
                    <thead>
                        <tr>
                          <td><input type="checkbox" readOnly onClick={marcarTodos} checked={estadoMarcado}/></td>
                          <th>Comentario {estadoMarcado}</th>
                          
                          <th>Fecha comentario</th>
                          <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        {loading &&
                            <tr><td className="text-center" colSpan="5"><Spinner animation="border" variant="primary" size="md" /></td></tr>
                        }
                        {!loading && comentarios.length === 0 && <tr><td className="text-center" colSpan="5">No se han realizado comentarios aún.</td></tr>}
                        {!loading && comentarios.length > 0 && comentarios}
                    </tbody>
                </Table>
                
          </div>
      </div>
    </div>
  );
}

export default ComentariosListComponent;
