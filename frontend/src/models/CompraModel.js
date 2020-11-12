export default class CompraModel{
    constructor(comp_id, comp_fecha_compra, comp_monto, comp_estado, usr_id, plan_id){
        this.comp_id = comp_id;
        this.comp_fecha_compra = comp_fecha_compra;
        this.comp_monto = comp_monto;
        this.comp_estado = comp_estado;
        this.usr_id = usr_id;
        this.plan_id = plan_id;
    }
}
