const express = require("express");
const router = express.Router();
const {
  deleteClassroom,
  editClassroom,
  addStudentToClassroom,
} = require("../controllers/classroomController");

router.delete("/:classroomId", deleteClassroom);
router.put("/:classroomId", editClassroom);
router.post("/:classroomId/students", addStudentToClassroom);

module.exports = router;
