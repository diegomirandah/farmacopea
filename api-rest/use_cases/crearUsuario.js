'use strict';
module.exports = (login, usuario, {usuariosrepo}) => {
	return usuariosrepo.crearUsuario(login, usuario);
};
