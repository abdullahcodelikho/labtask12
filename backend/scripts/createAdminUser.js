const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-app');
        const email = 'admin1@mgmt.com';
        const password = 'admin123';
        const name = 'admin1';

        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin: true
        });

        await user.save();
        console.log('Admin user created successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

createAdminUser(); 