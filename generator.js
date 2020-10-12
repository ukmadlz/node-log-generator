const Winston = require('winston');
const LogzioWinstonTransport = require('winston-logzio');
const Package = require('./package.json');
const Faker = require('faker');

// Configure the logging
const logger = Winston.createLogger({
  level: 'silly',
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new Winston.transports.File({ filename: 'error.log', level: 'error' }),
    new Winston.transports.File({ filename: 'combined.log' }),
    new LogzioWinstonTransport({
      level: 'info',
      name: 'winston_logzio',
      type: `${Package.name}-${Package.version}`,
      token: process.env.LOGZIO_SHIPPING_TOKEN,
      host: `${process.env.LOGZIO_LISTENER}:8071`,
    }),
    new Winston.transports.Console(),
  ],
});

// Log Levels
const LEVELS = Object.keys(Winston.config.npm.levels);

module.exports.generator = async () => {
  logger.debug('RUN LOG GENERATOR');
  const LOGAMOUNT = Math.floor(Math.random() * 10);
  for ( let i = 0; i < LOGAMOUNT; i++ ) {
    const randomLevel = Math.floor(Math.random() * LEVELS.length);
    const level = LEVELS[randomLevel];
    logger.log(level, {
      counter: i,
      level,
      countryCode: Faker.address.countryCode(),
      location: {
        lat: Faker.address.latitude(),
        lon: Faker.address.longitude()
      },
    });
  }
}