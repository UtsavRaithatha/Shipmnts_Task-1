const express = require("express");
const router = express.Router();
const {
  deleteClassroom,
  editClassroom,
  addStudentToClassroom,
  removeStudentFromClassroom,
  assignTasksToClassroom,
} = require("../controllers/classroomController");

router.delete("/:classroomId", deleteClassroom);
router.put("/:classroomId", editClassroom);
router.post("/:classroomId/students", addStudentToClassroom);
router.delete("/:classroomId/students/:studentId", removeStudentFromClassroom);
router.post("/:classroomId/tasks", assignTasksToClassroom);

module.exports = router;
