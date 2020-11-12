'use strict';
module.exports = (cont_tipo, plan_id, {contenidosRepo}) => {
	return contenidosRepo.consultarContenidosPorTipoYPlan(cont_tipo, plan_id);
};
