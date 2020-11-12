'use strict';
module.exports = (com_id, {comentariosRepo}) => {
	return comentariosRepo.marcarComentarioComoVisto(com_id);
};
