import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import UsuariosService from '../../services/UsuariosService';
import SessionService from '../../services/SessionService';
import LicenciasService from '../../services/LicenciasService';
import ComprasService from '../../services/ComprasService';
import SuspenderLicenciaModalComponent from './SuspenderLicenciaModalComponent';
import ReactivarLicenciaModalComponent from './ReactivarLicenciaModalComponent';

const licenciasService = new LicenciasService();
const sessionService = new SessionService();
const usuariosService = new UsuariosService();
const comprasService = new ComprasService();
function MiCuentaComponent() {
  
    const [usuario, setUsuario] = useState(false);
    const [licencias, setLicencias] = useState([]);
    const [licenciaActiva, setLicenciaActiva] = useState(false);
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        licenciasService.consultarLicenciasUsuario(sessionService.getUserData().usuario.usr_id).then(res => {
            if(res.status === 'OK' && res.code === 200){
                res.data.forEach(licencia => {
                    if(licencia.licencia.lic_estado === 'activa'){
                        setLicenciaActiva(true);
                    }
                    licencia.licencia.lic_fecha_creacion = new Date(licencia.licencia.lic_fecha_creacion).toLocaleString('es-CL');
                    licencia.licencia.lic_fecha_expiracion = new Date(licencia.licencia.lic_fecha_expiracion).toLocaleString('es-CL');
                    setLicencias(licencias => [...licencias, licencia]);
                });
            }
        });
        comprasService.comprasUsuario(sessionService.getUserData().login.usr_id).then(res => {
            if(res.status === 'OK' && res.code === 200){
                res.data.forEach(compra => {
                    compra.compra.comp_fecha_compra = new Date(compra.compra.comp_fecha_compra).toLocaleString('es-CL');
                    setCompras(compras => [...compras, compra]);
                });
            }
        });
        usuariosService.buscarUsuario(sessionService.getUserData().login.usr_id).then(resp => {
            setUsuario({
                usr_nombre: resp.data.usuario.usr_nombre,
                usr_pais: resp.data.usuario.usr_pais,
                usr_ocupacion: resp.data.usuario.usr_ocupacion,
                usr_empresa: resp.data.usuario.usr_empresa,
                usr_id: resp.data.usuario.usr_id,
                log_email: resp.data.login.log_email
            });
            setLoading(false);
        });
        
    }, []);

  return (
    <div className="container px-0 px-sm-3 py-md-3">
        <div className="row pt-3">
            <div className="col-12">
                <h4><b>Mi Cuenta</b></h4>
                <h5 className="mt-3">Bienvenido {usuario.usr_nombre ? usuario.usr_nombre : ' '}</h5>
                <p>Aquí puedes revisar el detalle de tu cuenta, el estado de tus compras realizadas o pendientes y licencias que poseas.</p>
            </div>
        </div>
        <hr/>
        <div className="row">
            <div className="col-12">
                <h6 className="lead">Detalle de la cuenta</h6>
                <Table striped bordered hover>
                    {loading &&
                        <tbody>
                            <tr><td className="text-center"><Spinner animation="border" variant="primary" size="md" /></td></tr>
                        </tbody>
                    }
                    {!loading && <tbody>
                        <tr>
                            <td>Nombre:</td>
                            <td>{usuario.usr_nombre ? usuario.usr_nombre : '-'}</td>
                        </tr>
                        <tr>
                            <td>N° Identificación</td>
                            <td>{usuario.usr_id ? usuario.usr_id : '-'}</td>
                        </tr>
                        <tr>
                            <td>Correo electrónico</td>
                            <td>{usuario.log_email ? usuario.log_email : '-'}</td>
                        </tr>
                        <tr>
                            <td>Empresa</td>
                            <td>{usuario.usr_empresa ? usuario.usr_empresa : '-'}</td>
                        </tr>
                        <tr>
                            <td>Ocupación</td>
                            <td>{usuario.usr_ocupacion ? usuario.usr_ocupacion : '-'}</td>
                        </tr>
                    </tbody>}
                </Table>
            </div>
        </div>
        <hr/>
        <div className="row">
            <div className="col-12 table-micuenta">
                <h6 className="lead">Compras realizadas</h6>
                <p><small>Aquí encontrarás las compras de planes que realices. Si tienes problema con alguna compra realizada podrás contactarnos indicando el número de orden 
                    generado al momento de la compra.</small></p>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th># Orden</th>
                        <th>Fecha compra</th>
                        <th>Monto compra (CLP)</th>
                        <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.length > 0 && compras.map( (c, index) => (
                            <tr key={index}>
                            <td>{c.compra.comp_id}</td>
                            <td>{c.compra.comp_fecha_compra}</td>
                            <td>{c.compra.comp_monto}</td>
                            <td>{c.compra.comp_estado}</td>
                            </tr>
                        ))}
                        {loading &&
                            <tr><td className="text-center" colSpan="4"><Spinner animation="border" variant="primary" size="md" /></td></tr>
                        }
                        {!loading && compras.length === 0 && <tr><td className="text-center" colSpan="4">No has realizado ninguna compra aún.</td></tr>}
                    </tbody>
                </Table>
            </div>
        </div>
        <hr/>
        <div className="row pb-5">
            <div className="col-12 table-micuenta   ">
                <h6 className="lead">Licencias usuario</h6>
                <p><small>Desde aquí podrás revisar las licencias de los planes que hayas adquirido. Puedes tener activa solo una licencia a la vez. Para poder realizar la 
                    compra de una nueva licencia, deberás suspender la licencia activa actualmente si es que tienes alguna. Una vez suspendida puedes reactivarla en cualquier
                    momento si es que esta se encuentra vigente.</small></p>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th># Licencia</th>
                        <th>Plan</th>
                        <th>Duración</th>
                        <th>Fecha creacion</th>
                        <th>Fecha expiración</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licencias.length > 0 && licencias.map( (lic, index) => (
                            <tr key={index}>
                                <td>{lic.licencia.lic_id}</td>
                                <td>{lic.plan.plan_nombre}</td>
                                <td>{lic.plan.plan_duracion} meses</td>
                                <td>{lic.licencia.lic_fecha_creacion}</td>
                                <td>{lic.licencia.lic_fecha_expiracion}</td>
                                <td>{lic.licencia.lic_estado}</td>
                                <td>
                                    {lic.licencia.lic_estado === 'suspendida' && !licenciaActiva
                                        && <ReactivarLicenciaModalComponent lic={lic.licencia} plan={lic.plan}/> }
                                    {lic.licencia.lic_estado === 'activa' 
                                        ? <SuspenderLicenciaModalComponent lic={lic.licencia} plan={lic.plan}/> 
                                        : ''}
                                </td>
                            </tr>
                        ))}
                        {loading &&
                            <tr><td className="text-center" colSpan="7"><Spinner animation="border" variant="primary" size="md" /></td></tr>
                        }
                        {!loading && licencias.length === 0 && <tr><td className="text-center" colSpan="7">No posees licencias activas.</td></tr>}
                    </tbody>
                </Table>
            </div>
        </div>
    </div>
  );
}

export default MiCuentaComponent;