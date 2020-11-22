const mongoose = require('mongoose')

const clasx = mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Classx', clasx)
