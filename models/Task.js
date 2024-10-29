import mongoose from 'mongoose';
// Creating Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
