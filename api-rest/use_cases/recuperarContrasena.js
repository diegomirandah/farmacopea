'use strict';
module.exports = (login, {loginRepo}) => {
	return loginRepo.recuperarContrasena(login);
};
