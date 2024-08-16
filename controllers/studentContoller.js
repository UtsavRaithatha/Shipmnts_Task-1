const Student = require("../models/Student");
const Classroom = require("../models/Classroom");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
    });

    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email }).populate("classrooms");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewClassrooms = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("classrooms");

    const classrooms = student.classrooms.map((classroom) => ({
      classroomId: classroom._id,
      classroomName: classroom.classroomName,
    }));

    res.status(200).json({ classrooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
