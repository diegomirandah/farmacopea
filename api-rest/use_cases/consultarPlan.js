'use strict';
module.exports = (plan_id, {planesRepo}) => {
	return planesRepo.consultarPlan(plan_id);
};
