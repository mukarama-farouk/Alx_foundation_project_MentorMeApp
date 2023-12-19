const express = require('express');

const router = express.Router();
const mentorController = require('../controllers/mentorController');


router.post('/add', mentorController.addMentor);
router.get('/allmentors/:id', mentorController.getMentorById);
router.get('/allmentors', mentorController.getMentors); 
router.patch('/:id', mentorController.updateMentorById);


module.exports = router;