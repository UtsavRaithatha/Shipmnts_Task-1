const Teacher = require("../models/Teacher");
const Classroom = require("../models/Classroom");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerTeacher = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const teacher = await Teacher.create({
      name,
      email,
      password: hashedPassword,
    });

    await teacher.save();

    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email }).populate("classrooms");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createClassroom = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { classroomName } = req.body;

    const classroom = new Classroom({
      classroomName,
      teacher: teacherId,
    });

    await classroom.save();

    const teacher = await Teacher.findById(teacherId);
    teacher.classrooms.push(classroom._id);
    await teacher.save();

    res.status(201).json({ classroomId: classroom._id, classroomName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewClassrooms = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teacher.findById(teacherId).populate("classrooms");

    res.status(200).json({ classrooms: teacher.classrooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
