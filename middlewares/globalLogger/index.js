const logger = require('@utils/logger')

/**
 * The HTTP request and has properties for the request query string, parameters, body, HTTP headers.
 * @typedef {Object} Request
 */

/**
 * The HTTP response that an Express app sends when it gets an HTTP request.
 * @typedef {Object} Response
 */

/**
 * Passes control to the next matching route.
 * @typedef {Object} Next
 */

/**
 * Middleware to automatically log every request though all routes.
 *
 * @param {Request} req The HTTP request object.
 * @param {Response} res The HTTP response object.
 * @param {Next} next Function that passes control to the next matching route.
 */
const globalLogger = (req, res, next) => {
	logger.info(`Request Received, Responded in ${res.get('x-response-time')}ms`, req}
  next()
})

module.exports = globalLogger