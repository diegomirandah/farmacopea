'use strict';
module.exports = (login, {loginRepo}) => {
	return loginRepo.iniciarSesion(login);
};
