const express = require('express')
const router = express.Router()

//utils
const logger = require('#utils/logger')


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
 * 
 */
const globalLogger = (req, res, next) => {
  logger.info(`Request Received`, req)
  res.on("finish", function () {
    logger.info(`Responded in ${res.get('X-Response-Time')}`, req)
  });
  next()
}

module.exports = globalLogger