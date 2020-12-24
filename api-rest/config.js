'use strict';
var config = {
    app: {
        port: process.env.APP_PORT || 3000
    },
    uploadsFolder: process.env.UPLOADS_FOLDER,
    secret: process.env.SECRET_KEY,
    tokenExpiration: 86400,
    mail: {
        enabled: true,
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMPT_PORT || 587, // default = 587
        secure: process.env.SMTP_SECURE || false, // true for 465, false for other ports, default = false
        auth: {
            user: process.env.SMTP_USER || 'email@gmail.com',
            pass: process.env.SMTP_PASS || 'gmailpass', 
        },
    }
};

module.exports = config;
