'use strict';
module.exports = (cont_id, {planesRepo}) => {
	return planesRepo.consultarPlanesContenido(cont_id);
};
