/**
 * Custom winston logger with http request object. Switched between console transport and AWS Cloudwatch depending on environment/
 * @module Logger
 */

const { nanoid } = require('nanoid')

const winston = require('winston'),
  WinstonCloudWatch = require('winston-cloudwatch')

const logStreamId = nanoid()
const env = process.env.ENV.toLowerCase()

if (env == "development" || env == "dev") { //if development env then use console  
  const devFormat = winston.format.printf((info, opts) => {
    const item = info
    return !item.requestId && !item.method && !item.path ? `${new Date().toISOString()} ${item.level}: ${item.message}` : `${new Date().toISOString()} ${item.level}: [${item.requestId}] ${item.method} ${item.path} ${item.message}`
  })

  winston.add(new winston.transports.Console({
    json: true,
    colorize: true,
    format: winston.format.combine(devFormat)
  }))
} else { //if production or staging use staging winston-aws
  winston.add(new WinstonCloudWatch({
    logGroupName: process.env.npm_package_name,
    logStreamName: `${process.env.npm_package_name}${env=="staging" ? '-staging' : ''}-${new Date().toISOString().split('T')[0]}-${logStreamId}`,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    messageFormatter: (item) => {
      return !item.requestId && !item.method && !item.path ? `${item.level}: ${item.message}` : `${item.level}: [${item.requestId}] ${item.method} ${item.path} ${item.message}`
    }
  }));
}

/**
 * Custom winston log with http request object at log level 0.
 *
 * @param {String} message The message to be logged.
 * @param {Request=} req The HTTP request object.
 */
exports.error = (message, req) => winston.error(message, req ? { method: req.method, path: req.path, requestId: req.get('x-request-id') } : null)

/**
 * Custom winston log with http request object at log level 1.
 *
 * @param {String} message The message to be logged.
 * @param {Request=} req The HTTP request object.
 */
exports.warn = (message, req) => winston.warn(message, req ? { method: req.method, path: req.path, requestId: req.get('x-request-id') } : null)

/**
 * Custom winston log with http request object at log level 2.
 *
 * @param {String} message The message to be logged.
 * @param {Request=} req The HTTP request object.
 */
exports.info = (message, req) => winston.info(message, req ? { method: req.method, path: req.path, requestId: req.get('x-request-id') } : null)

/**
 * Custom winston log with http request object at log level 3.
 *
 * @param {String} message The message to be logged.
 * @param {Request=} req The HTTP request object.
 */
exports.http = (message, req) => winston.http(message, req ? { method: req.method, path: req.path, requestId: req.get('x-request-id') } : null)

/**
 * Custom winston log with http request object at log level 4.
 *
 * @param {String} message The message to be logged.
 * @param {Request=} req The HTTP request object.
 */
exports.verbose = (message, req) => winston.verbose(message, req ? { method: req.method, path: req.path, requestId: req.get('x-request-id') } : null)

/**
 * Custom winston log with http request object at log level 5.
 *
 * @param {String} message The message to be logged.
 * @param {Request=} req The HTTP request object.
 */
exports.debug = (message, req) => winston.debug(message, req ? { method: req.method, path: req.path, requestId: req.get('x-request-id') } : null)

/**
 * Custom winston log with http request object at log level 6.
 *
 * @param {String} message The message to be logged.
 * @param {Request=} req The HTTP request object.
 */
 exports.silly = (message, req) => winston.silly(message, req ? { method: req.method, path: req.path, requestId: req.get('x-request-id') } : null)



