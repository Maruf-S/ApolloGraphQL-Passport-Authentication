import winston = require('winston');
const file = new winston.transports.File({
    filename: './logs/error.log',
    level: 'error',
    // handleExceptions: true,
});

const logger = winston.createLogger({
    level: 'error',

    transports: [
        new (winston.transports.Console)(),
        file
    ]
});

export default logger;