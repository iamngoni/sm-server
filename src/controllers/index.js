const Accounts = require('./../models/accounts')
const { validationResult } = require('express-validator')
const Classx = require('./../models/class')
const Attendance = require("./../models/attendance")

module.exports = {
  signup: async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const user = { firstName, lastName, schoolId, email, accountType, clas, password } = req.body
    const account = new Accounts(user)
    account.setPassword(user.password)
    try {
      const isSaved = await account.save()
      if (!isSaved) {
        return res.status(422).json({ errors: 'Could not save user' })
      }

      return res.status(201).json({ message: 'Account created' })
    } catch (error) {
      if (error.code == 11000) {
        return res.status(400).json({ errors: 'Account exists on' + Object.keys(error.keyPattern) })
      }
    }
  },

  login: async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const user = { email, password } = req.body
    const account = await Accounts.findOne({ email: email })
    if (!account) {
      return res.status(404).json({ errors: 'Account not found' })
    }

    if (!account.validatePassword(user.password)) {
      return res.status(422).json({ errors: 'Incorrect password provided' })
    }

    return res.status(200).json({ message: 'Login successful', account: account.JsonAuth() })
  },

  getStudents: async function (req, res) {
    const students = await Accounts.find({ accountType: 'student' }, '_id firstName lastName schoolId email accountType')
    return res.status(200).json({ students })
  },

  addClass: async function (req, res) {
    const clas = { name } = req.body
    const classx = new Classx(clas)
    try {
      const isSaved = await classx.save()
      if (!isSaved) {
        return res.status(422).json({ errors: 'Could not save class' })
      }

      return res.status(201).json({ message: 'Saved' })
    } catch (error) {
      if (error.code == 11000) {
        return res.status(400).json({ errors: 'Class exists ' + Object.keys(error.keyPattern) })
      }
    }
  },

  getClasses: async function (req, res) {
    const classes = await Classx.find()
    res.status(200).json({ classes })
  },

  getTeachers: async function (req, res) {
    const teachers = await Accounts.find({ accountType: 'teacher' }, 'firstName lastName _id accountType email schoolId class')
    return res.status(200).json({ teachers })
  },

  deleteStudent: async function(req, res){
    let studentId = req.params.studentId;
    let deleted = await Accounts.deleteOne({_id: studentId});
    if(deleted){
      return res.status(200).json({message: "Deleted"});
    }
  },

  getStudentsByClass: async function(req, res){
    let students = await Accounts.find({clas: req.params.className, accountType: 'student'}, '_id firstName lastName clas email accountType schoolId');
    return res.status(200).json({students});
  },

  markAttendance: async function(req, res){
    let data = req.body;
    console.log(data);
    let todaysAttendance = await Attendance.findOne({clas: data.class, date: `${new Date().getDate()}-${new Date().getMonth()}`});
    console.log(todaysAttendance);
    if(todaysAttendance){
      let arrayList = todaysAttendance.attendees;
      if(!arrayList.includes(data.attendee)){
        arrayList.push(data.attendee);
      }
      todaysAttendance.attendees = arrayList;
      let isSvd = await todaysAttendance.save();
      if(!isSvd){
        return res.status(422).json({errors: "Not saved"});
      }

      return res.status(200).json({message: "Marked present"});
    }else{
      let attendance = new Attendance({
        clas: data.class,
        attendees: [data.attendee]
      });

      try{
        let isSaved = await attendance.save();
        if(!isSaved){
          return res.status(422).json({errors: "Not saved"});
        }

        return res.status(200).json({message: "Marked present"});
      }catch(error){
        console.log(error);
      }
    }
  },

  getAttendance: async function(req, res){
    let attendance = await Attendance.findOne({date: `${new Date().getDate()}-${new Date().getMonth()}`, clas: req.params.className}).populate('attendees', 'clas accountType _id firstName lastName email schoolId');
    return res.status(200).json({attendance});
  },

  checkAttendance: async function(req, res){
    let student = await Accounts.findById(req.user.id);
    let attendance = await Attendance.find();
    let attendanceDetails = [];

    attendance.forEach(function(attendanc){
      if(attendanc.attendees.includes(student._id)){
        let data = {
          date: attendanc.date,
          status: "Present"
        };
        attendanceDetails.push(data);
      }else{
        let data = {
          date: attendanc.date,
          status: "Absent"
        };
        attendanceDetails.push(data);
      }
    });

    res.status(200).json({details: attendanceDetails})
  }
}
