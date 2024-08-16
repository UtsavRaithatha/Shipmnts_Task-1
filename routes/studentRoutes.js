const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  viewClassrooms,
  submitTask,
} = require("../controllers/studentContoller");
const { protectStudent } = require("../middleware/authMiddleware");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/:studentId/classrooms", protectStudent, viewClassrooms);
router.post(
  "/:studentId/classrooms/:classroomId/tasks/:taskId",
  protectStudent,
  upload.single("submission"),
  submitTask
);

module.exports = router;
