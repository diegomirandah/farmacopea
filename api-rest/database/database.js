'use strict';
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 	  process.env.MYSQL_HOST || 'localhost',
	user: 	  process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASS || '',
	database: process.env.MYSQL_DB   || 'farmacopeabd'
});

connection.connect( (err) => {
	if(err && err.sqlMessage){
		console.log(err.sqlMessage);
		return;
	}else if(err){
		console.log('Error de conexion con Base de Datos.');
		return;
	}else{
		console.log('Base de datos conectada.');
	}
});

module.exports = connection;
