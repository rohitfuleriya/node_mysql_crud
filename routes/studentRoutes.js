const express = require('express');
const { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

// router object 
const router = express.Router()

// routes 

// Get All Students List || List 

router.get('/getall', getStudents)

// get students by id
router.get('/get/:id', getStudentByID)

router.post('/create', createStudent)

router.put('/update/:id',updateStudent )

router.delete('/delete/:id',deleteStudent )

module.exports = router