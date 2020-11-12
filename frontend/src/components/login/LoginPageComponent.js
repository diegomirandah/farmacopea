import React from 'react';
import LoginComponent from './LoginComponent';
import RegisterComponent from './registerComponent';

function LoginPageComponent() {
 
  return (
    <div className="container px-0 px-sm-3 py-3 py-sm-5">
    <div className="row justify-content-center py-3 py-sm-5">
        <div className="col-12 col-sm-5 col-md-4 col-lg-4 col-xl-4">
            <h2>Inicio de sesión</h2>
            <p className="my-4">Aquí puede ingresar a su cuenta, desde la que podrá adquirir planes y luego consultarlos.</p>
            <LoginComponent></LoginComponent>
        </div>
        <div className="mt-3 mt-sm-0 col-12 col-sm-7 col-md-8 col-lg-6 col-xl-6">
            <h2>Regístrese</h2>
            <p className="my-4">Para poder acceder al contenido y a las demás opciones de Farmacopea, debe poseer una cuenta de usuario para poder ingresar.</p>
            <RegisterComponent></RegisterComponent>
        </div>
    </div>
    </div>
  );
}

export default LoginPageComponent;
