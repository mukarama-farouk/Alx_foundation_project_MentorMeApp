const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, phone, fullname, password, confirmPassword } = req.body;

  if (!email || !phone || !fullname || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Password hashing failed' });
    }

    try {

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }

      const newUser = new User({
        email,
        phone,
        fullname,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        message: 'Registration successful! Please login to continue',
        user: {
          email: newUser.email,
          phone: newUser.phone,
          fullname: newUser.fullname,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed', message: error.message });
    }
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Passwords match, set up the session
      req.session.userId = user._id;

      res.status(200).json( {fullname: user.fullname, email: user.email} );
      
    } else {
      // Invalid email or password
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    // Server error
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json(user);
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
    const userCount = users.length;
    res.status(200).json({users, userCount});
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users', message: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
};
