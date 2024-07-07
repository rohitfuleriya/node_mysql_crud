// GET  ALL STUDENTS

const db = require("../config/db");

const getStudents = async (req, res) => {
    try {
        const data = await db.query(' SELECT * FROM students')
        if(!data){
            return res.status(404).send({
                success:false,
                message: 'No Records found'
            })
        }
        res.status(200).send ({
            success:true,
            message: 'All Students Records',
            totalStudents:data[0].length,
            data: data[0],
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Get All Student API',
            error
        })
    }
};

// Get Student by ID 

const getStudentByID = async(req, res) => {
    try {
        const studentId = req.params.id 
        if(!studentId){
            return res.statu(404).send({
                success:false,
                message: "invalid id"
            })
        }
        const data = await  db.query(`SELECT * FROM students where student_id = ?`, [studentId])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"no records found"
            });
        }
        res.status(200).send({
            success:true,
            studentCount: data[0].length,
            studentDetails: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get Studend by id API',
            error
        })
    }
};

const createStudent = async (req, res) => {
    try {
        const { name, roll_no, fees, student_class, medium } = req.body;

        // Validate required fields
        if (!name || !roll_no || !fees || !student_class || !medium) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }

        // Insert new student into the database
        const query = 'INSERT INTO students (name, roll_no, fees, student_class, medium) VALUES (?, ?, ?, ?, ?)';
        const values = [name, roll_no, fees, student_class, medium];
        const [data] = await db.query(query, values);

        if (!data || data.affectedRows === 0) {
            return res.status(500).send({
                success: false,
                message: 'Error in Insert Query'
            });
        }

        return res.status(201).send({
            success: true,
            message: 'New Student Record Created',
            data: data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Create Student API',
            error
        });
    }
};


const updateStudent = async(req, res) => {
    try {
        const studentId = req.params.id 
        if(!studentId){
            return res.status(404).send({
                success:false,
                message: "Invalid Id or provide id"
            })
        }

        const { name, roll_no, fees, student_class, medium } = req.body;
        const data = await db.query(`UPDATE students SET name = ?, roll_no = ?, fees=?, student_class=?, medium = ? WHERE student_id = ?`,[name, roll_no, fees, student_class, medium,studentId] );
        if(!data ){
            return res.status(500).send({
                success:false,
                message: "Error in updata data"
            })
        }
        res.status(200).send({
            success: true,
            message: "Student Details Updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
        success:false,
        error
        })
    }
}

const deleteStudent = async(req, res) => {
    try {
        const studentId = req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message: 'Please Provide Student Id or Valid Student id'
            });
        }
        await db.query(`DELETE FROM students WHERE student_id = ?`, [studentId]);
        res.status(200).send({
            success: true,
            message: "Student Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Delete student api',
            error
        })
    }
}
module.exports = { 
    getStudents,
    getStudentByID,
    createStudent,
    updateStudent,
    deleteStudent
};
