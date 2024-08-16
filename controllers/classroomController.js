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

exports.checkSubmissionStatus = async (req, res) => {
  try {
    const { classroomId, taskId } = req.params;
    const classroom = await Classroom.findById(classroomId).populate("tasks");

    const task = classroom.tasks.find((task) => task._id.toString() === taskId);

    const submissions = task.submissions.map((submission) => ({
      studentId: submission.student,
      studentName: submission.student.name,
      status: submission.status,
    }));

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
