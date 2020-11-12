import jwt from 'jsonwebtoken';

export default class SessionService{

    constructor(){
        this.token = localStorage.getItem('token');
    }

    setToken(token){
        localStorage.setItem('token', token);
    }

    logout(){
        localStorage.clear();
        document.location.href='/';
    }

    getUserData(){
        return jwt.decode(this.token);
    }

    getToken(){
        return this.token;
    }

    isLogged(){
        return (this.token && this.validateTokenTime());
    }

    isGestorContenidos(){
        return (this.token && this.getUserData().login.log_tipo === 'gestorContenidos');
    }

    isGestorUsuarios(){
        return (this.token && this.getUserData().login.log_tipo === 'gestorUsuarios');
    }

    isAdmin(){
        return (this.token && this.getUserData().login.log_tipo === 'gestorContenidosUsuarios');
    }

    getTipoAcceso(){
        return (this.token && this.getUserData().login.log_tipo);
    }

    validateTokenTime(){
        const user = jwt.decode(this.token);
        const time = Math.floor(new Date().getTime() / 1000);
        if( time >= user.exp ){
            localStorage.clear();
            return false;
        }
        return true;
    }
}
