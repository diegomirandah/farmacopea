'use strict';
module.exports = (usr_id, {usuariosrepo}) => {
	return usuariosrepo.buscarUsuario(usr_id);
};
