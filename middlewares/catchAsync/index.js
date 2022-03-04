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
 * Middleware to replace try-catch blocks in async routes with API calls.
 *
 * @param {Request} req The HTTP request object.
 * @param {Response} res The HTTP response object.
 * @param {Next} next Function that passes control to the next matching route.
 */
const catchAsync = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error(err, req)
    next(err)
  });
};

modules.exports = catchAsync