'use strict';
module.exports = (anio, {comprasRepo}) => {
	return comprasRepo.consultarComprasPorAnio(anio);
};
