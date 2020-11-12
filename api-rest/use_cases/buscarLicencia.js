'use strict';
module.exports = (lic_id, {licenciasRepo}) => {
	return licenciasRepo.buscarLicencia(lic_id);
};
