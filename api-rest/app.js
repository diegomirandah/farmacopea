'use strict';
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressJwt = require('express-jwt');
var app = express();
var reply = require('./utils/reply');
var config = require('./config');
const fileUpload = require('express-fileupload');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());


// default options
app.use(fileUpload());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    //res.setHeader('Content-Type', 'multipart/form-data, application/json');
    next();
});

app.use(expressJwt({secret: config.secret}).unless({path: ["/login/iniciarsesion" , "/login/registrarse" , /^\/planes\// , "/login/recuperarcontrasena"]}));

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.json(reply.error(401,err.message));
        return;
    }
    next();
});

    

var usuariosRouter = require('./routes/usuariosRouter');
var planesRouter = require('./routes/planesRouter');
var loginRouter = require('./routes/loginRouter');
var contenidosRouter = require('./routes/contenidosRouter');
var comentariosRouter = require('./routes/comentariosRouter');
var licenciasRouter = require('./routes/licenciasRouter');
var comprasRouter = require('./routes/comprasRouter');
var imagenesRouter = require('./routes/imagenesRouter');

app.use('/usuarios', usuariosRouter);
app.use('/planes', planesRouter);
app.use('/login', loginRouter);
app.use('/contenidos', contenidosRouter);
app.use('/comentarios', comentariosRouter);
app.use('/licencias', licenciasRouter);
app.use('/compras', comprasRouter);
app.use('/imagenes', imagenesRouter);

module.exports = app;
