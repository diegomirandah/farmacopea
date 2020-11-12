'use strict';
module.exports = (usuario, login, {usuariosrepo}) => {
	return usuariosrepo.actualizarDatosUsuario(usuario, login);
};
