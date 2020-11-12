'use strict';
module.exports = (login, usuario, {loginRepo}) => {
	return loginRepo.registrarse(login, usuario);
};
