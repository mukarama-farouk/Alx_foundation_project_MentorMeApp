const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, Unique: true, required: true},
    phone: {required: true, type: String},
    fullname: {type: String, required: true},
    password: {type: String, required: true}
});


module.exports = mongoose.model('User', userSchema);