"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createLogger, format, transports } = require('winston');
exports.default = createLogger({
    transports: [
        new transports.File({
            filename: 'logs/server.log',
            format: format.combine(format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.align(), format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
        }),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: format.combine(format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.align(), format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
        }),
    ],
});
