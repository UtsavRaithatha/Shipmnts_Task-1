const express = require("express");
const router = express.Router();
const { deleteClassroom } = require("../controllers/classroomController");

router.delete("/:classroomId", deleteClassroom);

module.exports = router;
