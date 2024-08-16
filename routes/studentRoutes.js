const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  viewClassrooms,
} = require("../controllers/studentContoller");
const { protectStudent } = require("../middleware/authMiddleware");

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/:studentId/classrooms", protectStudent, viewClassrooms);

module.exports = router;
