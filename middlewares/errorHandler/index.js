const HTTPErrors = require('http-errors')
const HTTPStatuses = require('statuses')

const logger = require('#utils/logger')

const env = process.env.ENV?.toLowerCase()

/**
 * The Express error object and contains express error information and a stack trace.
 * @typedef {Object} Error
 */

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
 * Error-handling middleware..
 *
 * @param {Error} err The Express error object.
 * @param {Request} req The HTTP request object.
 * @param {Response} res The HTTP response object.
 * @param {Next} next Function that passes control to the next matching route.
 * 
 */
const errorHandler = (err, req, res, next) => {

    let message

    if (err instanceof HTTPErrors.HttpError) {
        message = { message: err.message }

        if (env == 'development' || env == 'dev' || !env) message.stack = err.stack

        message.status = err.statusCode
    } else {
        logger.error(err?.stack, req)
    }

    if ((process.env.ENV === 'production' || process.env.ENV === 'prod') && !message) {
        message = { message: 'Something went wrong.', status: 500 }
    }

    if (message) {

        let statusCode = parseInt(message.status, 10)
        let statusName = HTTPStatuses(statusCode)
        let messageToSend = `${statusCode} ${statusName}-${message.message}`

        if (!(process.env.ENV === 'production' || process.env.ENV === 'prod'))messageToSend = `${statusCode} ${statusName}-${message.stack}`

        logger.error(messageToSend, req)

        if ((process.env.ENV === 'production' || process.env.ENV === 'prod') && statusCode >= 500) {
            statusCode = 500
            statusName = HTTPStatuses(statusCode)
            messageToSend = `${statusCode} ${statusName}-${message.message}`
        }

        res.status(statusCode).type('txt').send(messageToSend)
        return
    }

    next(err)
}

module.exports = errorHandler

