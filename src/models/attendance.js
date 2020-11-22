const mongoose = require("mongoose");

const attendance = mongoose.Schema({
  clas: {
    type: String
  },
  date: {
    type: String,
    default: `${new Date().getDate()}-${new Date().getMonth()}`
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accounts'
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model("Attendance", attendance);