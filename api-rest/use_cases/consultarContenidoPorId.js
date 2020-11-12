'use strict';
module.exports = (cont_id, {contenidosRepo}) => {
	return contenidosRepo.consultarContenidoPorId(cont_id);
};
