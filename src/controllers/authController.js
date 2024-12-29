const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { User } = require('../models/userModel');
const { body: validatorBody, validationResult } = require('express-validator');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.role_type !== 'u') {
      return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 401, message: 'Invalid credentials' });
    }

    const token = jwt.generateToken({ userId: user.id, role: user.role_type });

    res.json({
      status: 200,
      message: 'Logged in',
      result: {
        user_id: user.id,
        access_token: token,
        token_type: 'Bearer',
        role_type: user.role_type,
        expires_at: new Date(Date.now() + 3600000),
      },
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

const registerUser = async (req, res) => {
  // Validation
  await validatorBody('name').notEmpty().withMessage('Name is required').run(req);
  await validatorBody('email').isEmail().withMessage('Invalid email').run(req);
  await validatorBody('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role_type } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role_type: role_type || 'u', // Default to 'u' if not provided
    });

    return res.status(201).json({
      status: 201,
      message: 'User registered successfully',
      result: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role_type: newUser.role_type,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = { login, registerUser };
