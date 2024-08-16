const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      status: {
        type: String,
        enum: ["submitted", "pending"],
        default: "pending",
      },
    },
  ],
});

module.exports = mongoose.model("Task", taskSchema);
