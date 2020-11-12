'use strict';
module.exports = (usr_id, {licenciasRepo}) => {
	return licenciasRepo.comprobarLicenciasUsuario(usr_id);
};
