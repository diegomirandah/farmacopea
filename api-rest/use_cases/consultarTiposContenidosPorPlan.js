'use strict';
module.exports = (plan_id, {contenidosRepo}) => {
	return contenidosRepo.consultarTiposContenidosPorPlan(plan_id);
};
