import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';
const router = express.Router();

// User Sign in
router.post('/signin', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const signInUser = await User.findOne({ email, password });
  if (signInUser) {
    res.send({
      _id: signInUser.id,
      name: signInUser.name,
      email: signInUser.email,
      token: getToken(signInUser),
    });
  } else {
    res.send({ message: 'User not found' });
  }
});

// User register
router.post('/register', async (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.send({ msg: 'email already exists' });
    }
    const registerUser = new User({ name, email, password });
    const newUser = await registerUser.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
