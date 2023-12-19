const Mentor = require('../models/mentor.js')



const addMentor = async(req, res) => {
    const { name, category, description, image, profileLink } = req.body;

    if (!name || !category || !description || !image || !profileLink ) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    try {
        const existingMentor = await Mentor.findOne({ name });
        if (existingMentor) {
        return res.status(400).json({ error: 'Mentor name is already in use' });
        }

        const newMentor = new Mentor({
            name,
            category,
            description,
            image,
            profileLink,
            
        });

        await newMentor.save();

        res.status(201).json({
            message: 'Mentor added successfully!',
            mentor: {
            _id: newMentor._id,
            name: newMentor.name,
            category: newMentor.category,
            description: newMentor.description,
            image: newMentor.image,
            profileLink: newMentor.profileLink,
        },
        });
    } catch (error) {
        res.status(500).json({ error: 'Mentor addition failed', message: error.message });
    }

}


const getMentors = async (req, res) => {
    try {
      const mentors = await Mentor.find();
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving mentors', message: error.message });
    }
};
  
const getMentorById = async (req, res) => {
  const mentorId = req.params.id;

  try {
    const mentor = await Mentor.findById(mentorId);

    if (mentor) {
      res.status(200).json(mentor);
    } else {
      res.status(404).json({ error: 'Mentor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving mentor', message: error.message });
  }
};


const updateMentorById = async (req, res) => {
  const mentorId = req.params.id;
  const updates = req.body;

  try {
    const mentor = await Mentor.findByIdAndUpdate(mentorId, updates, { new: true });

    if (mentor) {
      res.status(200).json({
        message: 'Mentor updated successfully!',
        mentor,
      });
    } else {
      res.status(404).json({ error: 'Mentor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating mentor', message: error.message });
  }
};




module.exports = {
    addMentor,
    getMentors,
    getMentorById,
    updateMentorById,
};