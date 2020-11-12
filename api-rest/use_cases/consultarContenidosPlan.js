'use strict';
module.exports = (plan_id, {contenidosRepo}) => {
	return contenidosRepo.consultarContenidosPlan(plan_id);
};
