const express = require("express");
const router = express.Router();
const {
  deleteClassroom,
  editClassroom,
  addStudentToClassroom,
  removeStudentFromClassroom,
} = require("../controllers/classroomController");

router.delete("/:classroomId", deleteClassroom);
router.put("/:classroomId", editClassroom);
router.post("/:classroomId/students", addStudentToClassroom);
router.delete("/:classroomId/students/:studentId", removeStudentFromClassroom);

module.exports = router;
