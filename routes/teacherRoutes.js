const express = require("express");
const router = express.Router();
const {
  registerTeacher,
  loginTeacher,
  createClassroom,
  viewClassrooms,
} = require("../controllers/teacherController");
const { protectTeacher } = require("../middleware/authMiddleware");

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.post("/:teacherId/classrooms", protectTeacher, createClassroom);
router.get("/:teacherId/classrooms", protectTeacher, viewClassrooms);

module.exports = router;
