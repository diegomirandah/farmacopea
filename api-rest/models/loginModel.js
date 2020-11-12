'use strict';
module.exports = class loginModel{
	constructor(usr_id, log_email, log_contrasena, log_tipo, log_token, log_expiracion){
        this.usr_id = usr_id;
        this.log_email = log_email;
        this.log_contrasena = log_contrasena;
        this.log_tipo = log_tipo;
        this.log_token = log_token;
        this.log_expiracion = log_expiracion;
    }
}
