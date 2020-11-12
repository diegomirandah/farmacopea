import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, NavDropdown, Button } from 'react-bootstrap';
import SessionService from '../../services/SessionService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faKey, faUserAlt, faClipboardList, faChartLine, faUserPlus, faAddressBook, faBookMedical, faSearch, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import LicenciasService from '../../services/LicenciasService';
const sessionService = new SessionService();
const licenciasService = new LicenciasService();
function NavbarComponent(props) {

  const [isLogged, setLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState('false');
  const [isGestorUsuarios, setIsGestorUsuarios] = useState('false');
  const [isGestorContenidos, setIsGestorContenidos] = useState('false');
  const [licencia, setLicencia] = useState(false);
  const [search, setSearch] = useState('');

  function handleSearch(e) {
    const { value } = e.target;
    setSearch(value);
  }

  function handleSubmit(e){
    e.preventDefault();
    if(search.length > 2)
    document.location.href = "/contenidos/buscar/" + search;
  }

  useEffect( () => {
    setLogged(sessionService.isLogged());
    setIsAdmin(sessionService.isAdmin());
    setIsGestorContenidos(sessionService.isGestorContenidos());
    setIsGestorUsuarios(sessionService.isGestorUsuarios());
    
    if(isLogged){
      licenciasService.consultarLicenciaActivaUsuario(sessionService.getUserData().login.usr_id).then(res => {
        //console.log(res);
        if(res.code === 200){
          //console.log(res.data);
          res.data.forEach(lic => {
            if(lic.licencia.lic_estado === 'activa'){
              setLicencia(lic.licencia.lic_id);     
            }  
          });
          
        }
      });
    }
  }, [isLogged]);

  return (
    <Navbar className="row m-0 px-0 bg-secundario navbar-dark" expand="lg">
          <Navbar.Toggle/>
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <Link to="/"><Nav.Link as="li">Inicio</Nav.Link></Link>
              <Link to="/planes"><Nav.Link as="li">Ver planes</Nav.Link></Link>
              {isLogged && <Link to="/contenidos/ver/todo/cont"><Nav.Link as="li">Contenido</Nav.Link></Link>}
              {isLogged && (isGestorContenidos || isGestorUsuarios || isAdmin) && 
              <NavDropdown title="Administración">
                {(isAdmin || isGestorUsuarios) && <>
                <NavDropdown.Header>Estadísticas</NavDropdown.Header>
                <Link to="/estadisticas"><NavDropdown.Item as="li"><FontAwesomeIcon className="mr-2" icon={faChartLine}/>Consultar estadísticas</NavDropdown.Item></Link>
                </>}

                  <NavDropdown.Divider className="d-none d-lg-block" />
                  <NavDropdown.Header>Gestionar contenido</NavDropdown.Header>
                  {(isAdmin || isGestorContenidos) && <Link to="/contenidos/agregar"><NavDropdown.Item as="li"><FontAwesomeIcon className="mr-2" icon={faBookMedical}/>Agregar contenido</NavDropdown.Item></Link>}
                  <Link to="/contenidos/cambios"><NavDropdown.Item as="li"><FontAwesomeIcon className="mr-2" icon={faClipboardList}/>Ver cambios contenidos</NavDropdown.Item></Link>
                

                {(isGestorUsuarios || isAdmin) && <>
                  <NavDropdown.Divider className="d-none d-lg-block" />
                  <NavDropdown.Header>Gestionar usuarios</NavDropdown.Header>
                  <Link to="/usuarios/agregar"><NavDropdown.Item as="li"><FontAwesomeIcon className="mr-2" icon={faUserPlus}/>Agregar usuario</NavDropdown.Item></Link>
                  <Link to="/usuarios/revisar"><NavDropdown.Item as="li"><FontAwesomeIcon className="mr-2" icon={faAddressBook}/>Revisar usuarios</NavDropdown.Item></Link>
                </>}

                {(isGestorContenidos || isAdmin) && <>
                  <NavDropdown.Divider className="d-none d-lg-block" />
                  <NavDropdown.Header>Gestionar comentarios</NavDropdown.Header>
                  <Link to="/comentarios"><NavDropdown.Item as="li"><FontAwesomeIcon className="mr-2" icon={faCommentDots}/>Revisar comentarios</NavDropdown.Item></Link>
                </>}
              </NavDropdown>
              }
              
              {!isLogged && <Link to="/login"><Nav.Link as="li">Iniciar sesión</Nav.Link></Link>}
              {isLogged &&
              <NavDropdown title="Mi cuenta">
                <NavDropdown.Header>Detalles de la cuenta</NavDropdown.Header>
                <Link to="/cuenta/micuenta"><NavDropdown.Item as="li"><FontAwesomeIcon className="mr-2" icon={faUserAlt}/>Mi cuenta</NavDropdown.Item></Link>
                <NavDropdown.Divider className="d-none d-lg-block" />
                <NavDropdown.Header>Datos personales</NavDropdown.Header>
                <Link to="/cuenta/actualizardatos"><NavDropdown.Item as="li"><FontAwesomeIcon className="mr-2" icon={faClipboardList}/> Actualizar datos</NavDropdown.Item></Link>
                <Link to="/cuenta/cambiarcontrasena"><NavDropdown.Item as="li"><FontAwesomeIcon className="mr-2" icon={faKey}/>Cambiar contraseña</NavDropdown.Item></Link>
                <NavDropdown.Divider className="d-none d-lg-block" />
                <NavDropdown.Header>Sesión</NavDropdown.Header>
                <Link to="/logout"><NavDropdown.Item as="li"> <FontAwesomeIcon className="mr-2" icon={faSignOutAlt}/>Cerrar sesión</NavDropdown.Item></Link>
              </NavDropdown>
              }
              </Nav>
              
              {isLogged && ((isAdmin || isGestorContenidos) || licencia) && 
                <Form onSubmit={handleSubmit} inline>
                  <FormControl type="text" name={search} value={search} onChange={handleSearch} placeholder="Buscar contenido..." className="mr-sm-2 mt-2 mt-sm-0" />
                  <Button disabled={search.length <= 2 ? true : false} className="mt-2 mt-sm-0" type="submit" variant="btn btn-outline-primary"><FontAwesomeIcon className="mr-2" icon={faSearch}/>Buscar</Button>
                </Form>
              }
          </Navbar.Collapse>
      </Navbar>
  );
}

export default NavbarComponent;