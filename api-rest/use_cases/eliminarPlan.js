'use strict';
module.exports = (plan_id, {planesRepo}) => {
	return planesRepo.eliminarPlan(plan_id);
};
