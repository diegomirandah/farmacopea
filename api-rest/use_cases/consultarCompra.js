'use strict';
module.exports = (comp_id, {comprasRepo}) => {
	return comprasRepo.consultarCompra(comp_id);
};
