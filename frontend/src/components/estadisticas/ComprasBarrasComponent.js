import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ComprasService from '../../services/ComprasService';
import { Spinner } from 'react-bootstrap';


const comprasService = new ComprasService();

function ComprasBarrasComponent(){
    const [loading, setLoading] = useState(true);
    const [anio, setAnio] = useState(new Date().getFullYear());
    const [aniosOption, setAniosOption] = useState([]);
    const [nCompras, setNCompras] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
    const [haveCompras, setHaveCompras] = useState(false);
    
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre   '],
        datasets: [{
            label: 'n° de compras',
            data: nCompras,
            backgroundColor: 'rgba(0, 255, 0, 0.4)',
            borderWidth: 2
        }]
    };

    useEffect( () => {
        comprasService.consultarPrimeraCompra().then(resp => {
            //console.log(resp);
            if(resp.status === 'OK' && resp.code === 200){
                let anioPrimeraCompra = new Date(resp.data.comp_fecha_compra).getFullYear();
                let aniosOpt = [];
                for(let i=anioPrimeraCompra; i<=anio; i++){
                    //console.log('agregando '+i);
                    aniosOpt.push(<option key={i} value={i}>{i}</option>);
                }
                setAniosOption(aniosOpt);
                //console.log(aniosOpt);
            }
            
        });
        comprasService.consultarComprasPorAnio(anio).then(resp => {
            if(resp.status === 'OK' && resp.code === 200){
                let compras = [...nCompras];
                resp.data.forEach( c => {
                    compras[c.mes-1] = c.n_compras;
                });
                setHaveCompras(true);
                setNCompras(compras);
                setLoading(false);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const consultarCompras = (e) => {
        setLoading(true);
        setAnio(e.target.value);
        comprasService.consultarComprasPorAnio(e.target.value).then(resp => {
            if(resp.status === 'OK' && resp.code === 200){
                let compras = [0,0,0,0,0,0,0,0,0,0,0,0];
                resp.data.forEach( c => {
                    compras[c.mes-1] = c.n_compras;
                });
                setNCompras(compras);
                setHaveCompras(true);
                setLoading(false);
            }
            if(resp.status === 'OK' && resp.code === 201){
                setHaveCompras(false);
                setLoading(false);
            }
        });
        
    };

    return(
        <> 
            Seleccionar año a mostrar: <select className="form-control w-50" defaultValue={anio} onChange={consultarCompras}>
               {aniosOption}
            </select><br/>
            {loading && 
            <div className="w-100 text-center">
            <Spinner className="mt-3" animation="border" variant="primary" size="md" />
            </div>
            }
            {!loading && haveCompras &&  <Bar data={data} />}
            {!loading && !haveCompras && 
                <p>No se realizaron compras el año seleccionado.</p>
            }
        </>
    );
}

export default ComprasBarrasComponent;
