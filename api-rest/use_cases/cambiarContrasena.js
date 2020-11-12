'use strict';
module.exports = (login, {loginRepo}) => {
	return loginRepo.cambiarContrasena(login);
};
