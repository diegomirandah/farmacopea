'use strict';
const status_ok = 'OK';
const status_error = 'ERROR';
const type_error = 'ERROR';
const type_fatal = 'FATAL';

function ok(code,value, message) {
    if(value == null && message != null){
        return createResp(status_ok, message, null, null,code);
    }else if( value !== undefined && value != null && message != null) {
        return createResp(status_ok, message, value, null,code);
    } else  if (value !== undefined && value != null){
        return createResp(status_ok, null, value, null,code);
    }else{
        return createResp(status_ok,null,null,null, code);
    }
}

function error(code,error) {
    if (error instanceof Error) {
        return createResp(status_error, error.message, null, type_error, code);
    } else {
        return createResp(status_error, error, null, type_error, code);
    }
}

function fatal(code, error) {
    if(!code){
        code = 500;
    }
    if (error instanceof Error) {
        return createResp(status_error, error.message, null, type_fatal, code);
    } else {
        return createResp(status_error, error, null, type_fatal, code);
    }
}

function createResp(status, message, value, type, code) {
    var resp = {
        status: status,
        code: code,
        data: null,
        type: type,
        message: message
    };

    if (value != undefined ) {
        resp.data = JSON.parse(JSON.stringify(value));
    }else if (status == status_ok) {
        resp.data = [];
    }

    

    return resp;
}

function throwsError(error) {
    return createResp(status_error, error.message, null, error.type, error.level, error.trace);
}
function getType(){}

module.exports = {
    ok,
    error,
    fatal,
    throwsError
};
