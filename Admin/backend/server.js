// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const ticketsRoutes = require('./routes/tickets');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware – Fixed CORS for your frontend (5174 port included)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],  // ← Support 5174 Vite port
  credentials: true
}));
app.use(express.json());

// MongoDB connection – Fixed logging
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected! Database: flowlydb. View in Compass: mongodb://localhost:27017/'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketsRoutes);

// Health check (test: http://localhost:5000/api/health)
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Backend running!' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Test signup: POST http://localhost:5000/api/auth/signup');
});