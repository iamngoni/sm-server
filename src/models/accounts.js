const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const account = mongoose.Schema({
  firstName: String,
  lastName: String,
  schoolId: {
    type: String,
    unique: true
  },
  clas: {
    type: String,
    default: null
  },
  email: {
    type: String,
    unique: true
  },
  accountType: {
    type: String,
    default: 'student'
  },
  salt: String,
  hash: String
}, { timestamps: true })

account.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

account.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

account.methods.generateJWT = function () {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    id: this._id,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000)
  }, 'school-management')
}

account.methods.JsonAuth = function () {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    schoolId: this.schoolId,
    email: this.email,
    accountType: this.accountType,
    token: this.generateJWT(),
    clas: this.clas
  }
}

module.exports = mongoose.model('Accounts', account)
