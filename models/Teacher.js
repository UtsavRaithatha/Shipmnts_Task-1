const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }]
});

module.exports = mongoose.model('Teacher', teacherSchema);
