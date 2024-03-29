import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';
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
    res.status(401).send({ message: 'User not found' });
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
    res.status(401).send({ message: error.message });
  }
});

//user favourite image
router.post('/favimage/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  const { imageId } = req.body;
  //console.log(id, imageId);
  User.findOne({ _id: id }, async function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.send();
    }
    if (!user.favouriteImage.includes(imageId)) {
      user.favouriteImage.push(imageId);
    }

    user.save();
    res.send({ message: 'image added to favourites.' });
  });
});

//get fav images
router.get('/getfavimag/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  User.findOne({ _id: id })
    .populate('favouriteImage')
    .exec(function (err, images) {
      if (!images.favouriteImage) {
        res.send({ message: 'No favourite images for this user!' });
      }
      if (images) {
        res.send(images.favouriteImage);
      }

      if (err) {
        res.send({ error: err.message });
      }
    });
});

export default router;
