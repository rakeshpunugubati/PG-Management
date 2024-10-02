const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    propertyName:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
});

const logincredentials = mongoose.model('logincredentials', userSchema);
module.exports = logincredentials;