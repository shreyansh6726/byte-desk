const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/my_auth_db');

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    user_id: String,
    password: String
}));

app.post('/api/login', async (req, res) => {
    const { user_id, password } = req.body;

    try {
        // 1. Find user by ID
        const user = await User.findOne({ user_id });
        if (!user) return res.status(401).json({ message: "User not found" });

        // 2. Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // 3. Success
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
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = new User({ username, user_id, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        res.status(400).json({ message: "User ID already exists" });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));