"use strict";

var mongoose = require("mongoose");

var attendance = mongoose.Schema({
  clas: {
    type: String
  },
  date: {
    type: String,
    "default": "".concat(new Date().getDate(), "-").concat(new Date().getMonth())
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accounts'
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("Attendance", attendance);