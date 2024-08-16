const Teacher = require("../models/Teacher");
const Classroom = require("../models/Classroom");
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

    res.status(200).json({ message: "Student added successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
