'use strict';
module.exports = class cambioModel{
	constructor(cam_id, cam_fecha_modificacion, cam_nombre, cam_descripcion, cont_id, usr_id){
        this.cam_id = cam_id;
        this.cam_fecha_modificacion = cam_fecha_modificacion;
        this.cam_nombre = cam_nombre;
        this.cam_descripcion = cam_descripcion;
        this.cont_id = cont_id;
        this.usr_id = usr_id;
    }
}
