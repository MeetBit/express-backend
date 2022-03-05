const express = require('express')
const router = express.Router()

//controllers
const { getCalendar, createCalendar, updateCalendar, deleteCalendar} = require('./calendar')

router.get('/:calendarId', getCalendar)
router.post('/', createCalendar)
router.patch('/:calendarId', updateCalendar)
router.delete('/:calendarId', deleteCalendar)

module.exports = router