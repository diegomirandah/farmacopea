import React from 'react';
import logo from '../../assets/images/uv_logo.png';

function HeaderComponent(){
    return(
        <div className="row justify-content-end py-4 text-white">
            <div className="col-6 col-sm-9">
            <h2>Farmacopea</h2>
            <h3>Chilena</h3>
            <p>
                Institución Oficial Farmacopea de Chile.
            </p>
            </div>
            <div className="col-6 col-sm-3 text-right">
                <img style={{width: '150px'}} alt="logo farmacopea" src={logo}/>
            </div>
        </div>
    );
}

export default HeaderComponent;
