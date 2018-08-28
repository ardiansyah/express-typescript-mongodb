import * as winston from 'winston';
import * as appRoot from 'app-root-path';

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export const logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    // new winston.transports.Console(options.console)
  ],
  exitOnError: false,
});

logger.stream({
  write: function(message, encoding) {
    logger.info(message);
  },
});

process.on('unhandledRejection', function (reason, p) {
  logger.warn('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});