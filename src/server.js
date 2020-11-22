const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.Promise = global.Promise

const connection = mongoose.connection

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

connection.on('connecting', function () {
  console.log('Connecting to database.')
})

connection.on('error', function () {
  console.log('Error connecting to database. Exiting application...')
  process.exit(1)
})

connection.on('connected', function () {
  console.log('Connected to database.')
})

app.listen(config.port, function () {
  console.log('API running on http://localhost:8080')
})
