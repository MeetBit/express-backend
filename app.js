const express = require('express')

//middleware imports
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression')
const responseTime = require('response-time')
const globalLogger = require('@middlewares/globalLogger')

//utils imports
const createError = require('http-errors')
const logger = require('@utils/logger')

//routers imports
const indexRouter = require('@routes/index')

const app = express();

//middleware
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(responseTime())
app.use(globalLogger())

//routers
app.use('/', indexRouter);

logger.info(`RUNNING ${process.env.npm_package_name} v${process.env.npm_package_version} on ${process.env.PORT}`)

module.exports = app;
