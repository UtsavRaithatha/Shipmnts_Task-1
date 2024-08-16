const Teacher = require("../models/Teacher");
const Classroom = require("../models/Classroom");
const Student = require("../models/Student");
const Task = require("../models/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.deleteClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;

    await Classroom.findByIdAndDelete(classroomId);

    res.status(200).json({ message: "Classroom deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { classroomName } = req.body;

    await Classroom.findByIdAndUpdate(classroomId, { classroomName });

    res.status(200).json({ message: "Classroom updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addStudentToClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { studentId } = req.body;

    const classroom = await Classroom.findById(classroomId);

    classroom.students.push(studentId);

    await classroom.save();

    const student = await Student.findById(studentId);

    student.classrooms.push(classroomId);

    await student.save();

    res.status(200).json({ message: "Student added successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeStudentFromClassroom = async (req, res) => {
  try {
    const { classroomId, studentId } = req.params;

    const classroom = await Classroom.findById(classroomId);

    classroom.students = classroom.students.filter(
      (student) => student.toString() !== studentId
    );

    await classroom.save();

    const student = await Student.findById(studentId);

    student.classrooms = student.classrooms.filter(
      (classroom) => classroom.toString() !== classroomId
    );

    await student.save();

    res.status(200).json({ message: "Student removed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const taskSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String },
//     dueDate: { type: Date, required: true },
//     submissions: [
//       {
//         student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
//         status: {
//           type: String,
//           enum: ["submitted", "pending"],
//           default: "pending",
//         },
//       },
//     ],
//   });

exports.assignTasksToClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { title, description, dueDate } = req.body;

    const classroom = await Classroom.findById(classroomId);

    const task = new Task({
      title,
      description,
      dueDate,
    });

    await task.save();

    classroom.tasks.push(task._id);

    await classroom.save();

    res.status(201).json({
      taskId: task._id,
      title,
      description,
      dueDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
