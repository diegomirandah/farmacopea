'use strict';
module.exports = (com_estado, {comentariosRepo}) => {
	return comentariosRepo.consultarComentariosPorEstado(com_estado);
};
