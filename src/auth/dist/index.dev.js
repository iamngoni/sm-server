'use strict'

const jwt = require('jsonwebtoken')

module.exports = function _callee (req, res, next) {
  let bearerHeader, bearer, token, decoded
  return regeneratorRuntime.async(function _callee$ (_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          bearerHeader = req.headers.authorization

          if (!(typeof bearerHeader !== 'undefined')) {
            _context.next = 18
            break
          }

          bearer = bearerHeader.split(' ')
          token = bearer[1]

          if (token) {
            _context.next = 6
            break
          }

          return _context.abrupt('return', res.status(403).json({
            message: 'Fuck off nigga. Let\'s just talk like adults',
            status: 403
          }))

        case 6:
          _context.prev = 6
          decoded = jwt.verify(token, 'school-management')
          req.user = decoded
          return _context.abrupt('return', next())

        case 12:
          _context.prev = 12
          _context.t0 = _context.catch(6)
          console.log(_context.t0)
          return _context.abrupt('return', res.status(500).json({
            errors: 'Server error'
          }))

        case 16:
          _context.next = 19
          break

        case 18:
          return _context.abrupt('return', res.status(403).json({
            message: 'Fuck off nigga. Let\'s just talk like adults',
            status: 403
          }))

        case 19:
        case 'end':
          return _context.stop()
      }
    }
  }, null, null, [[6, 12]])
}
