const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

// 1. DATABASE CONNECTION (Updated for Deployment)
// Uses process.env for production and local string for testing
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shreyanshofficial6726_db_user:qVhqqTxxfadmddec@cluster0.ylrjh3i.mongodb.net/users';

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.error("MongoDB Connection Error:", err));

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    user_id: { type: String, unique: true }, // Added unique constraint
    password: String
}));

// 2. CORS CONFIGURATION (Keep this BEFORE your routes)
const allowedOrigins = [
  'https://byte-desk.vercel.app', 
  'http://localhost:3000'        
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json()); // Only need this once!

// 3. ROUTES
app.post('/api/login', async (req, res) => {
    const { user_id, password } = req.body;
    try {
        const user = await User.findOne({ user_id });
        if (!user) return res.status(401).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        res.status(200).json({ 
            message: "Success", 
            username: user.username 
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/api/signup', async (req, res) => {
    const { username, user_id, password } = req.body;
    try {
        // Hashing inside the try block is safer
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, user_id, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        // Checks if the error is a duplicate user_id
        if (err.code === 11000) {
            return res.status(400).json({ message: "User ID already exists" });
        }
        res.status(500).json({ message: "Error creating user" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});