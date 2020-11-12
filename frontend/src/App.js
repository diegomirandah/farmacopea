import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import homeComponent from './components/home/homeComponent';
import LoginPageComponent from './components/login/LoginPageComponent';
import ContenidoPageComponent from './components/contenido/ContenidoPageComponent';
import NavbarComponent from './components/navbar/NavbarComponent';
import HeaderComponent from './components/header/HeaderComponent';
import FooterComponent from './components/footer/FooterComponent';
import PlanesComponent from './components/planes/PlanesComponent';
import SessionService from './services/SessionService';
import AgregarContenidoComponent from './components/contenido/AgregarContenidoComponent';
import './App.css';

import EditarContenidoComponent from './components/contenido/EditarContenidoComponent';
import BuscarContenidoComponent from './components/contenido/BuscarContenidoComponent';
import AgregarUsuarioComponent from './components/usuarios/AgregarUsuarioComponent';
import RevisarUsuariosComponent from './components/usuarios/RevisarUsuariosComponent';
import ComprarComponent from './components/compras/ComprarComponent';
import CallbackCompraComponent from './components/compras/CallbackCompraComponent';
import CambiarContrasenaComponent from './components/cuenta/CambiarContrasenaComponent';
import ActualizarDatosComponent from './components/cuenta/ActualizarDatosComponent';
import MiCuentaComponent from './components/cuenta/MiCuentaComponent';
import EstadisticasComponent from './components/estadisticas/EstadisticasComponent';
import CambiosContenidosComponent from './components/contenido/CambiosContenidosComponent';
import UnauthorizedComponent from './components/error/UnauthorizedComponent';
import Switch from 'react-bootstrap/esm/Switch';
import RecuperarContrasenaComponent from './components/login/RecuperarContrasenaComponent';
import ComentariosListComponent from './components/comentarios/ComentariosListComponent';
const sessionService = new SessionService();

function App() {
  const tipoAcceso = sessionService.getTipoAcceso();
  const isLogged = sessionService.isLogged();
  return (
    <div>
      <div className="container-fluid bg-primario">
        <div className="container bg-primario container-header">
          <HeaderComponent/>
        </div>
      </div>
      
      <div className="container-fluid px-0">
        <Router>
          <div className="container-fluid bg-secundario">
            <div className="container container-navbar">
              <NavbarComponent/>
            </div>
          </div>
          <Switch className="m-0 py-0 my-0 px-3">
            <Route path="/" exact component={homeComponent} />
            
            <Route path="/unauthorized" exact component={UnauthorizedComponent} />
            <Route path="/login" exact component={LoginPageComponent} />
            <Route path="/recuperar-contrasena" exact component={RecuperarContrasenaComponent} />
            <Route path="/logout" render={() => sessionService.logout()} />
           
            <Route path="/planes" exact component={PlanesComponent} />
            <Route path="/planes/comprar/:plan_id" component={ComprarComponent} />

            <Route path="/compra/callback/:comp_id" render={() => isLogged ? <CallbackCompraComponent/> : <UnauthorizedComponent/>} />
           
            <Route path="/estadisticas" exact render={() => (tipoAcceso === 'gestorUsuarios') || (tipoAcceso === 'gestorContenidosUsuarios') ? <EstadisticasComponent/> : <UnauthorizedComponent/>} />
            <Route path="/comentarios" exact render={() => (tipoAcceso === 'gestorContenidos') || (tipoAcceso === 'gestorContenidosUsuarios') ? <ComentariosListComponent/> : <UnauthorizedComponent/>} />
            

            <Route path="/cuenta/micuenta" exact render={() => isLogged ? <MiCuentaComponent/> : <UnauthorizedComponent/>} />
            <Route path="/cuenta/actualizardatos" exact render={() => isLogged ? <ActualizarDatosComponent/> : <UnauthorizedComponent/>} />
            <Route path="/cuenta/cambiarcontrasena" exact render={() => isLogged ? <CambiarContrasenaComponent/> : <UnauthorizedComponent/>} />
           
            <Route path="/contenidos/buscar/:cont_nombre" render={() => isLogged ? <BuscarContenidoComponent/> : <UnauthorizedComponent/>} />
            <Route path="/contenidos/agregar" exact render={() => (tipoAcceso === 'gestorContenidos') || (tipoAcceso === 'gestorContenidosUsuarios') ? <AgregarContenidoComponent/> : <UnauthorizedComponent/>} />
            <Route path="/contenidos/cambios" exact render={() => (tipoAcceso === 'gestorContenidos' || tipoAcceso === 'gestorUsuarios' || tipoAcceso === 'gestorContenidosUsuarios') ? <CambiosContenidosComponent/> : <UnauthorizedComponent/>} />
            <Route path="/contenidos/editar/:cont_nombre/:cont_id" render={() => (tipoAcceso === 'gestorContenidos') || (tipoAcceso === 'gestorContenidosUsuarios') ? <EditarContenidoComponent/> : <UnauthorizedComponent/>} />
            <Route path="/contenidos/ver/:cont_nombre/:cont_id" render={() => isLogged ? <ContenidoPageComponent/> : <UnauthorizedComponent/>} />
           
            <Route path="/usuarios/agregar" exact render={() => (tipoAcceso === 'gestorUsuarios') || (tipoAcceso === 'gestorContenidosUsuarios') ? <AgregarUsuarioComponent/> : <UnauthorizedComponent/>} />
            <Route path="/usuarios/revisar"  exact render={() => (tipoAcceso === 'gestorUsuarios') || (tipoAcceso === 'gestorContenidosUsuarios') ? <RevisarUsuariosComponent/> : <UnauthorizedComponent/>} />
            </Switch>
          </Router>
      </div>
      <FooterComponent/>
    </div>
  );
}

export default App;
