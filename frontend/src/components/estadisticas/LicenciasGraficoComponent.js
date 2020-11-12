import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Spinner } from 'react-bootstrap';
import LicenciasService from '../../services/LicenciasService';


const licenciasService = new LicenciasService();;

function LicenciasGraficoComponent(){
    const [loading, setLoading] = useState(false);
    const [licencias, setLicencias] = useState([10,5,2]);
    const data = {
        labels: ['Activas','Vencidas', 'Suspendidas'],
        datasets: [{
            label: 'n° de compras',
            data: licencias,
            backgroundColor: [
                'rgba(0, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
                'rgba(54, 162, 235, 0.5)'
            ],
            borderWidth: 1
        }]
    };

    useEffect( () => {
        licenciasService.consultarEstadoLicencias().then(resp => {
            if(resp.status === 'OK' && resp.code === 200){
                let lic = [...licencias];
                resp.data.forEach(licencia => {
                    if(licencia.lic_estado === 'activa'){
                        lic[0] = licencia.n_licencias;
                    }
                    if(licencia.lic_estado === 'vencida'){
                        lic[1] = licencia.n_licencias;
                    }
                    if(licencia.lic_estado === 'suspendida'){
                        lic[2] = licencia.n_licencias;
                    }
                });
                setLicencias(lic);
                setLoading(false);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return(
        <>
            {loading && <Spinner className="mt-3" animation="border" variant="primary" size="md" />}
            {!loading &&  <Pie data={data} />}
            
        </>
    );
}

export default LicenciasGraficoComponent;
