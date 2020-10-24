import express from 'express';
import Image from '../models/ImageModel';
const router = express.Router();
import { isAuth } from '../util';

router.get('/', isAuth, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const images = await Image.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Image.countDocuments();
    res.send({
      images,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
