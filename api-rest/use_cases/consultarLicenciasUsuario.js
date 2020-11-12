'use strict';
module.exports = (usr_id, {licenciasRepo}) => {
	return licenciasRepo.consultarLicenciasUsuario(usr_id);
};
