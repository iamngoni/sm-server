const express = require('express')
const bp = require('body-parser')
const morgan = require('morgan')

const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api', require('./routes'))

module.exports = app
