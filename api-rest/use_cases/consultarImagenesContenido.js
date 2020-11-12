'use strict';
module.exports = (cont_id, {imagenesRepo}) => {
	return imagenesRepo.consultarImagenesContenido(cont_id);
};
