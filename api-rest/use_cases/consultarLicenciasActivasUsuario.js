'use strict';
module.exports = (usr_id, {licenciasRepo}) => {
	return licenciasRepo.consultarLicenciasActivasUsuario(usr_id);
};