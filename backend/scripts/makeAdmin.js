const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-app');
        
        const user = await User.findOne({ email: 'admin@example.com' });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        user.isAdmin = true;
        await user.save();
        
        console.log('User is now an admin');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

makeAdmin(); 