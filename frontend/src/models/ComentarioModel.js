export default class ComentarioModel{
    constructor(com_id, com_fecha_creacion, com_comentario, com_estado, usr_id, cont_id){
        this.com_id = com_id;
        this.com_fecha_creacion = com_fecha_creacion;
        this.com_comentario = com_comentario;
        this.com_estado = com_estado;
        this.usr_id = usr_id;
        this.cont_id = cont_id;
    }
}
