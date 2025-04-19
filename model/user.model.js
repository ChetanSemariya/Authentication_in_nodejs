const mongoose = require('mongoose');

// schema define
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        require : true, 
        unique: true
    },
    userpassword : {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', userSchema); // here user is our collectiona name and userSchema is our schema