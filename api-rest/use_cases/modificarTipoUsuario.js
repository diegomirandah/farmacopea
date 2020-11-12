'use strict';
module.exports = (login, {usuariosrepo}) => {
	return usuariosrepo.modificarTipoUsuario(login);
};
