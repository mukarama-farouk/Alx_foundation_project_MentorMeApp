const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    profileLink: { type: String, required: true },
});

module.exports = mongoose.model('Mentor', mentorSchema);