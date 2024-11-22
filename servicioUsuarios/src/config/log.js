const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV;
const logDir = 'logs';

// Crea el directorio de logs si no existe
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = createLogger({
    level: env === 'development' ? 'verbose' : 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console({ level: 'warn' }),
        new transports.File({ filename: './logs/somefile.log', level: 'error' }),
        new transports.File({ filename: './logs/exceptions.log', level: 'error', format: format.simple() }),
        new transports.File({ filename: './logs/user.log', level: 'info', format: format.simple() })
    ],
    exitOnError: false
});

// Exporta el logger y el stream
module.exports = logger;
module.exports.stream = {
    write: function(message, encoding) {
        logger.info(message.trim());
        console.log('message=', message.trim());
    }
};
