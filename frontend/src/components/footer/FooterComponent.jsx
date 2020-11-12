import React from 'react';
import logo from '../../assets/images/uv_logo.png';
import './FooterStyle.css';

function FooterComponent(){
    return(
        <>
        <div className="container-fluid px-0 px-sm-3 bg-primario">
            <div className="container px-0 px-sm-3 bg-primario">
            <div className="row justify-content-center py-4 py-sm-5 m-0 footer-links">
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                    <p className="text-uppercase font-weight-bold">Enlaces Relacionados</p>
                    <ul className="p-0" style={{listStyle: 'none'}}>
                        <li><a href="http://www.consejoderectores.cl/">Consejo de Rectores de las Universidades Chilenas</a></li>
                        <li><a href="https://www.uestatales.cl/cue/">Consorcio de Universidades del Estado de Chile</a></li>
                        <li><a href="https://cft.uv.cl/sitio/">CFT UV</a></li>
                        <li><a href="http://www.programaalerta.cl/web/">Programa Alerta</a></li>
                    </ul>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                    <p className="text-uppercase font-weight-bold">Info</p>
                    <ul className="p-0" style={{listStyle: 'none'}}>
                    <li><a href="http://farmacopea.cl/">Farmacopea Chilena</a></li>
                        <li><a href="https://uv.cl/archivos/Protocolo-N2-Coronavirus-IES-pre.pdf">Protocolo N°2 COVID-19</a></li>
                        <li><a href="https://cyl.uv.cl/licitaciones-obras">Llamados a licitación obras</a></li>
                        <li><a href="https://cyl.uv.cl/otras-licitaciones">Llamados a otras licitaciones</a></li>
                        <li><a href="https://cinv.uv.cl/">Centro Interdisciplinario de Neurociencia de Valparaíso</a></li>
                        <li><a href="https://marejadas.uv.cl/">Sistema de alerta de marejadas</a></li>
                        <li><a href="https://cyl.uv.cl/cargos">Concursos para cargos en la Universidad de Valparaíso</a></li>
                        <li><a href="https://igualdadydiversidad.uv.cl/">Unidad de Igualdad y Diversidad</a></li>
                       
                    </ul>
                </div>
                <div className="col-6 col-sm-5 mt-1 mt-sm-3 mt-md-0 col-md-4 col-lg-3 col-xl-3">
                    <img style={{width: '100%'}} alt="logo farmacopea" src={logo}/>
                </div>
                </div>
                </div>
                </div>
                <div className="container-fluid">
                
                <div className="row justify-content-center bg-secundario py-3">
                <div className="col-12 text-center text-white">
                <p className="m-0">
                    <small>Derechos Reservados &copy; | Av. Gran Bretaña 1093, Playa Ancha, Valparaíso, 2020 | Contacto: 032-2508132</small>
                </p>
                </div>
            
            </div>
        </div>
        </>
    );
}

export default FooterComponent;
