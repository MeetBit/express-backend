const express = require('express')

//middleware
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression')
const responseTime = require('response-time')

//utils
const createError = require('http-errors')

//routers
const indexRouter = require('./routes/index')

const app = express();

//middleware
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(responseTime())

//routers
app.use('/', indexRouter);


module.exports = app;