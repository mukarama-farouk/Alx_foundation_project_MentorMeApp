const { User } = require("../models/user");

const bcrypt  = require("bcrypt");

const registerUser = async (req, res) => {
    const { email, phone, fullname, password } = req.body;

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = new User({
        email,
        phone,
        fullname,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Successfully registered'});
    }catch (error){
        res.status(500).json({error: 'Registration failed'})
    }
}

const loginUser = async(req, res) => {
    const { email, password} = req.body;
    try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Passwords match, set up the session
      req.session.userId = user._id;

      res.json({ message: 'Login successful!' });
    } else {
      // Invalid email or password
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    // Server error
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving user', message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving users', message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById

}