import React, { useState,useEffect } from 'react';
import EliminarUsuarioModalComponent from './EliminarUsuarioModalComponent';
import UsuariosService from '../../services/UsuariosService';
import { Table, Spinner } from 'react-bootstrap';
import EditarPermisosComponent from './EditarPermisosComponent';
import BuscarUsuarioComponent from './BuscarUsuarioComponent';

const usuariosService = new UsuariosService();
function RevisarUsuariosComponent(props) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect( () => {
      usuariosService.consultarUsuarios().then(resp => {
        //console.log(resp);
        if(resp.status === 'OK' && resp.code === 200){
          setUsuarios(resp.data);          
          setLoading(false);
          //console.log(resp.data);
        }  
      });
  }, []);

    return (
      <div className="container px-0 px-sm-3">
        <div className="row pt-3 pt-sm-5">
            <div className="col-12">
              <h4>Usuarios administración</h4>
            </div>
        </div>
        <div className="row py-3 py-sm-4">
           <div className="col-12">
             <h6>Buscar usuario en el sistema</h6>
             <p>Puede buscar un usuario en el sistema ingresando el número de identificación, nombre o correo de este.</p>
              <BuscarUsuarioComponent/>
           </div>
        </div>
        <div className="row">
            <div className="col-12">
            <h6>Lista de usuarios registrados</h6>
              <p>Aquí se muestra la lista de clientes y gestores de usuariosy contenidos del sistema.</p>
            </div>
            <div className="col-12 table-usuarios">
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>N° Identificación</th>
                    <th>Nombre</th>
                    <th>Correo electrónico</th>
                    <th>Permisos</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                  {loading &&
                  <tr>
                    <td className="text-center" colSpan="5"><Spinner animation="border" variant="primary" size="md" /></td>
                  </tr>
                  }
                  {!loading && usuarios.length > 0 && usuarios.map( (usr, index) => (
                    <tr key={index}>
                      <td>{usr.usuario.usr_id}</td>
                      <td>{usr.usuario.usr_nombre}</td>
                      <td>{usr.login.log_email}</td>
                      <td>
                        <EditarPermisosComponent usr={usr}/>
                        
                      </td>
                      <td><EliminarUsuarioModalComponent usr={usr} /></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
        </div>
      </div>
    );
  
}

export default RevisarUsuariosComponent;
