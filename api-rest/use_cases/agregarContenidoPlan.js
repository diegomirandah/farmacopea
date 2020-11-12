'use strict';
module.exports = (contenido, plan, {planesRepo}) => {
	return planesRepo.agregarContenidoPlan(contenido, plan);
};
