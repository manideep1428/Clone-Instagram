const express = require('express');
const router = express.Router();
const User = require("../Models/Schema");
const DbConnect = require('../Models/DbConnect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

DbConnect();

router.use(cookieParser());

router.post('/v1/signup', async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body;

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send("Email already registered");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username: username,
      name: name,
      email: email,
      password: hashPass
    });

    // Save user to the database
    await newUser.save();
    
    // Respond with success message
    return res.status(201).send("Account created successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/v1/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User Not Exist");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid Password");
    }

    // Generate JWT token
    const tokenData = {
      username: user.name,
      id: user._id,
      email: user.email
    };
    const secretKey = 'mynameisyoutubewhocares';
    const token = jwt.sign(tokenData, secretKey, { expiresIn: '7d' });

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    // Respond with success message
    res.send("Login successful");

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
