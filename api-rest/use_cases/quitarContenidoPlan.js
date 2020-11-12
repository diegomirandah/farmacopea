'use strict';
module.exports = (contenido, plan, {planesRepo}) => {
	return planesRepo.quitarContenidoPlan(contenido, plan);
};
