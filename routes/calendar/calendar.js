const express = require('express')
const router = express.Router()


//middleware
const catchAsync = require('#middlewares/catchAsync')

//utils
const logger = require('#utils/logger')

exports.getCalendar = catchAsync(async (req, res, next) => {
	//do some api calls
	
	//logger
	res.status(200).send('Successfully got calendar')
})

exports.createCalendar = catchAsync(async (req, res, next) => {
	//do some api calls
	
	let newCalendar

	if (!newCalendar) throw 500, 'Something went wrong in creating your calendar.'

	//logger
	res.status(201).send('Successfully created calendar')
})

exports.updateCalendar = catchAsync(async (req, res, next) => {
	//do some api calls
	
	//logger
	res.status(200).send('Successfully updated calendar')
})

exports.deleteCalendar = catchAsync(async (req, res, next) => {
	//do some api calls
	
	//logger
	res.status(200).send('Successfully deleted calendar')
})