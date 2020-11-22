"use strict";

var Accounts = require('./../models/accounts');

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var Classx = require('./../models/class');

var Attendance = require("./../models/attendance");

module.exports = {
  signup: function signup(req, res) {
    var _req$body;

    var errors, user, account, isSaved;
    return regeneratorRuntime.async(function signup$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = validationResult(req);

            if (errors.isEmpty()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(422).json({
              errors: errors.array()
            }));

          case 3:
            user = (_req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, schoolId = _req$body.schoolId, email = _req$body.email, accountType = _req$body.accountType, clas = _req$body.clas, password = _req$body.password, _req$body);
            account = new Accounts(user);
            account.setPassword(user.password);
            _context.prev = 6;
            _context.next = 9;
            return regeneratorRuntime.awrap(account.save());

          case 9:
            isSaved = _context.sent;

            if (isSaved) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(422).json({
              errors: 'Could not save user'
            }));

          case 12:
            return _context.abrupt("return", res.status(201).json({
              message: 'Account created'
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);

            if (!(_context.t0.code == 11000)) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              errors: 'Account exists on' + Object.keys(_context.t0.keyPattern)
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[6, 15]]);
  },
  login: function login(req, res) {
    var _req$body2;

    var errors, user, account;
    return regeneratorRuntime.async(function login$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            errors = validationResult(req);

            if (errors.isEmpty()) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              errors: errors.array()
            }));

          case 3:
            user = (_req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, _req$body2);
            _context2.next = 6;
            return regeneratorRuntime.awrap(Accounts.findOne({
              email: email
            }));

          case 6:
            account = _context2.sent;

            if (account) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              errors: 'Account not found'
            }));

          case 9:
            if (account.validatePassword(user.password)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              errors: 'Incorrect password provided'
            }));

          case 11:
            return _context2.abrupt("return", res.status(200).json({
              message: 'Login successful',
              account: account.JsonAuth()
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  getStudents: function getStudents(req, res) {
    var students;
    return regeneratorRuntime.async(function getStudents$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(Accounts.find({
              accountType: 'student'
            }, '_id firstName lastName schoolId email accountType'));

          case 2:
            students = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              students: students
            }));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  addClass: function addClass(req, res) {
    var _req$body3;

    var clas, classx, isSaved;
    return regeneratorRuntime.async(function addClass$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            clas = (_req$body3 = req.body, name = _req$body3.name, _req$body3);
            classx = new Classx(clas);
            _context4.prev = 2;
            _context4.next = 5;
            return regeneratorRuntime.awrap(classx.save());

          case 5:
            isSaved = _context4.sent;

            if (isSaved) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", res.status(422).json({
              errors: 'Could not save class'
            }));

          case 8:
            return _context4.abrupt("return", res.status(201).json({
              message: 'Saved'
            }));

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](2);

            if (!(_context4.t0.code == 11000)) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              errors: 'Class exists ' + Object.keys(_context4.t0.keyPattern)
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[2, 11]]);
  },
  getClasses: function getClasses(req, res) {
    var classes;
    return regeneratorRuntime.async(function getClasses$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(Classx.find());

          case 2:
            classes = _context5.sent;
            res.status(200).json({
              classes: classes
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  getTeachers: function getTeachers(req, res) {
    var teachers;
    return regeneratorRuntime.async(function getTeachers$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(Accounts.find({
              accountType: 'teacher'
            }, 'firstName lastName _id accountType email schoolId class'));

          case 2:
            teachers = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              teachers: teachers
            }));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  deleteStudent: function deleteStudent(req, res) {
    var studentId, deleted;
    return regeneratorRuntime.async(function deleteStudent$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            studentId = req.params.studentId;
            _context7.next = 3;
            return regeneratorRuntime.awrap(Accounts.deleteOne({
              _id: studentId
            }));

          case 3:
            deleted = _context7.sent;

            if (!deleted) {
              _context7.next = 6;
              break;
            }

            return _context7.abrupt("return", res.status(200).json({
              message: "Deleted"
            }));

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  getStudentsByClass: function getStudentsByClass(req, res) {
    var students;
    return regeneratorRuntime.async(function getStudentsByClass$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(Accounts.find({
              clas: req.params.className,
              accountType: 'student'
            }, '_id firstName lastName clas email accountType schoolId'));

          case 2:
            students = _context8.sent;
            return _context8.abrupt("return", res.status(200).json({
              students: students
            }));

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  markAttendance: function markAttendance(req, res) {
    var data, todaysAttendance, arrayList, isSvd, attendance, isSaved;
    return regeneratorRuntime.async(function markAttendance$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            data = req.body;
            console.log(data);
            _context9.next = 4;
            return regeneratorRuntime.awrap(Attendance.findOne({
              clas: data["class"],
              date: "".concat(new Date().getDate(), "-").concat(new Date().getMonth())
            }));

          case 4:
            todaysAttendance = _context9.sent;
            console.log(todaysAttendance);

            if (!todaysAttendance) {
              _context9.next = 18;
              break;
            }

            arrayList = todaysAttendance.attendees;

            if (!arrayList.includes(data.attendee)) {
              arrayList.push(data.attendee);
            }

            todaysAttendance.attendees = arrayList;
            _context9.next = 12;
            return regeneratorRuntime.awrap(todaysAttendance.save());

          case 12:
            isSvd = _context9.sent;

            if (isSvd) {
              _context9.next = 15;
              break;
            }

            return _context9.abrupt("return", res.status(422).json({
              errors: "Not saved"
            }));

          case 15:
            return _context9.abrupt("return", res.status(200).json({
              message: "Marked present"
            }));

          case 18:
            attendance = new Attendance({
              clas: data["class"],
              attendees: [data.attendee]
            });
            _context9.prev = 19;
            _context9.next = 22;
            return regeneratorRuntime.awrap(attendance.save());

          case 22:
            isSaved = _context9.sent;

            if (isSaved) {
              _context9.next = 25;
              break;
            }

            return _context9.abrupt("return", res.status(422).json({
              errors: "Not saved"
            }));

          case 25:
            return _context9.abrupt("return", res.status(200).json({
              message: "Marked present"
            }));

          case 28:
            _context9.prev = 28;
            _context9.t0 = _context9["catch"](19);
            console.log(_context9.t0);

          case 31:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[19, 28]]);
  },
  getAttendance: function getAttendance(req, res) {
    var attendance;
    return regeneratorRuntime.async(function getAttendance$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return regeneratorRuntime.awrap(Attendance.findOne({
              date: "".concat(new Date().getDate(), "-").concat(new Date().getMonth()),
              clas: req.params.className
            }).populate('attendees', 'clas accountType _id firstName lastName email schoolId'));

          case 2:
            attendance = _context10.sent;
            return _context10.abrupt("return", res.status(200).json({
              attendance: attendance
            }));

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    });
  },
  checkAttendance: function checkAttendance(req, res) {
    var student, attendance, attendanceDetails;
    return regeneratorRuntime.async(function checkAttendance$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return regeneratorRuntime.awrap(Accounts.findById(req.user.id));

          case 2:
            student = _context11.sent;
            _context11.next = 5;
            return regeneratorRuntime.awrap(Attendance.find());

          case 5:
            attendance = _context11.sent;
            attendanceDetails = [];
            attendance.forEach(function (attendanc) {
              if (attendanc.attendees.includes(student._id)) {
                var data = {
                  date: attendanc.date,
                  status: "Present"
                };
                attendanceDetails.push(data);
              } else {
                var _data = {
                  date: attendanc.date,
                  status: "Absent"
                };
                attendanceDetails.push(_data);
              }
            });
            res.status(200).json({
              details: attendanceDetails
            });

          case 9:
          case "end":
            return _context11.stop();
        }
      }
    });
  }
};