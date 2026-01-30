const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

// 1. DATABASE CONNECTION
// Fix: Added 'my_auth_db' to the fallback string to avoid the 'test' database issue.
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shreyanshofficial6726_db_user:qVhqqTxxfadmddec@cluster0.ylrjh3i.mongodb.net/my_auth_db?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
    .then(() => console.log(`Connected to Database: ${mongoose.connection.name}`))
    .catch(err => console.error("MongoDB Connection Error:", err));

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    user_id: { type: String, unique: true, required: true }, 
    password: { type: String, required: true }
}));

// 2. CORS CONFIGURATION
const allowedOrigins = [
  'https://byte-desk.vercel.app',
  'http://localhost:3000' // Added localhost back so you can still test on your computer
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps) or from our allowed list
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
app.use(express.json()); 

// 3. ROUTES
app.post('/api/login', async (req, res) => {
    const { user_id, password } = req.body;
    
    // Safety check for empty input
    if (!user_id || !password) {
        return res.status(400).json({ message: "Please provide ID and password" });
    }

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
    
    if (!username || !user_id || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, user_id, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
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