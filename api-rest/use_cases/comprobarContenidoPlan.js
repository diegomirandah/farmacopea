'use strict';
module.exports = (cont_id, plan_id, {contenidosRepo}) => {
	return contenidosRepo.comprobarContenidoPlan(cont_id, plan_id);
};
