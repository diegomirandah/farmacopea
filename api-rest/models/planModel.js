'use strict';
module.exports = class planModel{
	constructor(plan_id, plan_nombre, plan_precio, plan_descripcion, plan_duracion){
        this.plan_id = plan_id,
        this.plan_nombre = plan_nombre;
        this.plan_precio = plan_precio;
        this.plan_descripcion = plan_descripcion;
        this.plan_duracion = plan_duracion;
    }
}
