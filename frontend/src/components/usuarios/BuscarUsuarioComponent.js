import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import { Button, Form, FormControl, Spinner, Table } from 'react-bootstrap';
import UsuariosService from '../../services/UsuariosService';
import EditarPermisosComponent from './EditarPermisosComponent';
import EliminarUsuarioModalComponent from './EliminarUsuarioModalComponent';

const usuariosService = new UsuariosService();

function BuscarUsuarioComponent(props) {
 
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    function handleChange(e) {
        setSubmitted(false);
        const { value } = e.target;
        setSearch(value);
    }

    function handleSubmit(e) {
        setLoading(true);
        setSubmitted(true);
        e.preventDefault();
        //console.log(search);
        usuariosService.coincidenciaUsuario(search).then(resp => {
            //console.log(resp);
            
            if(resp.status==='OK'){
                //console.log(resp.data);
                setUsuarios(resp.data);
            }
            if(resp.status === 'ERROR'){
                setUsuarios([]);
            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setSubmitted(true);
        });
    }

    return (
      <> 
        <div className="row">  
            <div className="col-12">  
                <Form onSubmit={handleSubmit} inline>
                  <FormControl className={search.length > 50 ? ' is-invalid mr-sm-2 mt-2 mt-sm-0' : 'mr-sm-2 mt-2 mt-sm-0'} onChange={handleChange} value={search} placeholder="Ingrese N° Identificación o correo electrónico" />
                  <Button disabled={(search.length <= 2 ? true : false) || (search.length > 50 ? true : false) || loading} className="mt-2 mt-sm-0 mr-2" type="submit" variant="btn btn-primary"><FontAwesomeIcon className="mr-2" icon={faSearch}/>
                  {loading ? 'Buscando...' : 'Buscar'} {loading && <Spinner animation="border" variant="light" size="sm" />}
                  </Button>
                  {search.length > 50 &&
                    <div className="invalid-feedback">Límite de caracteres excedido.</div>
                  }
                  {!loading && submitted && usuarios.length === 0 && <label>No se encontraron resultados.</label>}
                </Form>
            </div>
        </div>
        {!loading && usuarios.length > 0 && <div className="row py-3 py-sm-4">
            <div className="col-12">
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
                {usuarios.map( (usr, index) => (
                    <tr key={index}>
                    <td>{usr.usuario.usr_id}</td>
                    <td>{usr.usuario.usr_nombre}</td>
                    <td>{usr.login.log_email}</td>
                    <td><EditarPermisosComponent usr={usr} /></td>
                    <td><EliminarUsuarioModalComponent usr={usr} /></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>
            <hr/>
        </div>}
      </>
    );
  }
export default BuscarUsuarioComponent;