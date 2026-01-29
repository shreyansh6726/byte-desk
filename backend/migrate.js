const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path'); 
const MONGO_URI = 'mongodb://localhost:27017/my_auth_db'; 

const userSchema = new mongoose.Schema({
    username: String,
    user_id: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const migrateData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB...");

        // This creates an absolute path to users.json regardless of where you run the command from
        const filePath = path.join(__dirname, 'users.json');
        
        if (!fs.existsSync(filePath)) {
            console.error(`Error: File not found at ${filePath}`);
            process.exit(1);
        }

        const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        console.log(`Found ${rawData.data.length} users. Starting migration...`);

        for (const userData of rawData.data) {
            const [username, user_id, plainPassword] = userData;

            const hashedPassword = await bcrypt.hash(plainPassword, 10);

            const newUser = new User({
                username,
                user_id,
                password: hashedPassword
            });

            await newUser.save();
        }

        console.log("Migration Successful! All users imported and passwords hashed.");
        process.exit();
    } catch (err) {
        console.error("Migration Failed:", err);
        process.exit(1);
    }
};

migrateData();