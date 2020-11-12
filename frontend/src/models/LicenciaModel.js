export default class LicenciaModel{
    constructor(lic_id, lic_fecha_creacion, lic_fecha_expiracion, lic_estado, usr_id, plan_id){
        this.lic_id = lic_id;
        this.lic_fecha_creacion = lic_fecha_creacion;
        this.lic_fecha_expiracion = lic_fecha_expiracion;
        this.lic_estado = lic_estado;
        this.usr_id = usr_id;
        this.plan_id = plan_id;
    }
}
