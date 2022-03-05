require('dotenv').config()
const express = require('express')

//middleware imports
const helmet = require("helmet")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression')
const responseTime = require('response-time')
const globalLogger = require('#middlewares/globalLogger')
const errorHandler = require('#middlewares/errorHandler')

//utils imports
const createError = require('http-errors')
const logger = require('#utils/logger')

//routers imports
const indexRouter = require('./routes/index')
const calendarRouter = require('#routes/calendar')

const app = express();

//middleware
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(responseTime())
app.use(globalLogger)

//routers
app.use('/', indexRouter)
app.use('/calendar', calendarRouter)

//errorHandler
app.use(errorHandler)

logger.info(`RUNNING ${process.env.npm_package_name} v${process.env.npm_package_version} on PORT ${process.env.PORT}`)

module.exports = app;
