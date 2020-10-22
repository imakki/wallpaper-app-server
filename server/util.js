import jwt from 'jsonwebtoken';
require('dotenv').config();

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

export { getToken };
