const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const deleteAllUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-app');
        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} users.`);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

deleteAllUsers(); 