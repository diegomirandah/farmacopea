'use strict';
var app = require('./app');
var infoApp = require('./package.json');
var config = require('./config');


app.listen(config.app.port, function () {
    console.log(`${infoApp.name} (v ${infoApp.version}) funcionando en http://localhost:${config.app.port} `);
});
