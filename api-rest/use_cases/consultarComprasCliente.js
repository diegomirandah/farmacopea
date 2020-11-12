'use strict';
module.exports = (usr_id, {comprasRepo}) => {
	return comprasRepo.consultarComprasCliente(usr_id);
};
