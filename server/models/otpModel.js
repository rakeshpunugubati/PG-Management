const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
    },
    otp:{
        type: String,
        required: true,
    },

    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 60, 
      }
    
});

const otpcenter = mongoose.model('otpcenter', userSchema);
module.exports = otpcenter