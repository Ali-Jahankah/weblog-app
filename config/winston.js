const winston = require("winston");
const rootApp = require("app-root-path");

const options = {
  File: {
    level: "info",
    filename: `${rootApp}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5000000, //5mb,
    format: winston.format.json(),
    maxFile: 5,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
};
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.File),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});
logger.stream = {
  write: function (msg) {
    logger.info(msg);
  },
};
module.exports = logger;
