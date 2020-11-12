import React, { useState, useEffect} from 'react';
import { Table, Alert, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ComprasService from '../../services/ComprasService';
import { useParams } from 'react-router-dom';
const comprasService = new ComprasService();

function CallbackCompraComponent(props) {
  const comp_id = useParams().comp_id;
  const [compra, setCompra] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect( () => {
    comprasService.consultarCompra(comp_id).then(resp => {
      //console.log(resp);
      if(resp.status === 'OK'){
        resp.data.comp_fecha_compra = new Date(resp.data.comp_fecha_compra).toLocaleString('es-CL');
        setCompra(resp.data);
        setLoading(false);
      }
    }).catch(err => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
   <div className="container px-0 px-sm-3 py-2 py-lg-5">
     {loading && 
        <div className="row justify-content-center py-3 py-lg-5">
          <Spinner animation="border" variant="primary" size="lg" />  
        </div>
      }

      {!loading && !compra && 
        <div className="row justify-content-center py-3 py-lg-5">
          <div className="col-12 col-lg-8 py-3">
              <Alert variant="danger" className="py-3 mb-3 align-items-center row m-0">
                <FontAwesomeIcon style={{fontSize: 40}} className="mr-3" icon={faTimesCircle}/>
                Ocurrió un error mientras se procesaba su compra.<br/> Inténtelo nuevamente más tarde.
              </Alert>
              <p>El problema podría deberse a un error temporal en la página o con su sistema bancario. Intentelo nuevamente, si el error persiste, comuníquese
                directamente con nosotros.
              </p>
          </div>
        </div>
      }
     
     {!loading && compra && compra.comp_estado === 'rechazado' && 
     <div className="row justify-content-center pt-0 pt-lg-5">
        <div className="col-12 col-lg-8 py-3">
            <Alert variant="danger" className="py-3 mb-3 align-items-center row m-0">
              <FontAwesomeIcon style={{fontSize: 40}} className="mr-3" icon={faTimesCircle}/>
              Su transacción fue rechazada.
            </Alert>
            <p>Esto puede deberse a que usted canceló el pago del pedido o que su transacción fue rechazada por el banco, intentelo nuevamente más tarde.</p>
        </div>
      </div>
      }

    {!loading && compra && compra.comp_estado === 'aceptado' && 
     <div className="row justify-content-center pt-0 pt-lg-5">
        <div className="col-12 col-lg-8 py-3">
            <Alert variant="success" className="py-3 mb-3 align-items-center row m-0">
              <FontAwesomeIcon style={{fontSize: 40}} className="mr-3" icon={faCheckCircle}/>
              Su transacción fue aprobada con éxito
            </Alert>
            <p>Gracias por realizar su compra, ya puede acceder al contenido de Farmacopea Chilena. Puede revisar 
              los detalles de su plan y licencia actual desde la sección mi cuenta.</p>
        </div>
      </div>
      }

    {compra && !loading && 
     <div className="row justify-content-center pb-5">
        <div className="col-12 col-lg-8">
          <Table striped>
            <tbody>
              <tr>
                <td>Orden de compra</td>
                <td>{compra.comp_id}</td>
              </tr>
              <tr>
                  <td>Estado de compra:</td>
                  <td>{compra.comp_estado}</td>
              </tr>
              <tr>
                  <td>Fecha compra:</td>
                  <td>{compra.comp_fecha_compra}</td>
              </tr>
              {compra.comp_estado === 'aceptado' &&
              <tr>
                <td>Monto pagado:</td>
                <td>$ {compra.comp_monto}</td>
              </tr>
              }
              </tbody>
            </Table>
            <Button onClick={() => window.print()} variant="info" className="mr-3">Imprimir comprobante</Button>
            <Button className="text-white" href="/cuenta/micuenta" variant="success">Ir a mi cuenta</Button>
        </div>
     </div>
     }
     <div className="row justify-content-center">
        <div className="col-12 col-lg-8 mt-3">
          <p>Si tienes algún problema al procesar el pago o con alguno de los datos ponte en contacto a través de uno de nuestros correos electrónicos de contacto.</p>
        </div>
     </div>
   </div>
  );
}

export default CallbackCompraComponent;