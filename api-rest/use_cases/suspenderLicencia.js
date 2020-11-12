'use strict';
module.exports = (lic_id, {licenciasRepo}) => {
	return licenciasRepo.suspenderLicencia(lic_id);
};
