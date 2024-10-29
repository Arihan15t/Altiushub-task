import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import authroute from './routes/authroute.js'
// Initialize App
const app = express();
const PORT =  5000;

app.get("/",(req,res)=>{
    res.send("Hello World");
})
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',authroute);
app.use('/api/tasks', taskRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://arihant3435:150151@cluster0.irruv.mongodb.net/tm";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure code
  }
}

// Start server after database connection
connectDB();

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



