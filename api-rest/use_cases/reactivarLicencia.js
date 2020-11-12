'use strict';
module.exports = (lic_id, {licenciasRepo}) => {
	return licenciasRepo.reactivarLicencia(lic_id);
};
