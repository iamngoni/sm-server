const controller = require('../controllers')
const { check } = require('express-validator')
const auth = require('./../auth')

const router = require('express').Router()

router.post('/signup', [
  check('firstName', 'First name required').exists(),
  check('lastName', 'Last name required').exists(),
  check('schoolId', 'School ID is required').exists(),
  check('email', 'Email required').exists().isEmail(),
  check('accountType', 'Account type required').exists(),
  check('clas', 'Class is required').optional(),
  check('password', 'Password required or is too short').exists().isLength({ min: 6 })
], controller.signup)

router.post('/login', [
  check('email', 'Email is required').exists().isEmail(),
  check('password', 'Password is required or is too short').exists().isLength({ min: 6 })
], controller.login)

router.get('/students', auth, controller.getStudents)

router.post('/addclass', auth, controller.addClass)

router.get('/classes', auth, controller.getClasses)

router.get('/teachers', auth, controller.getTeachers)

router.get("/student/:studentId/delete", auth, controller.deleteStudent);

router.get("/students/class/:className", auth, controller.getStudentsByClass);

router.post("/attendance", auth, controller.markAttendance);

router.get("/attendance/view/:className", auth, controller.getAttendance);

router.get("/student/attendance", auth, controller.checkAttendance);

module.exports = router
