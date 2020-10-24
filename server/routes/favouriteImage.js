import express from 'express';
import UserFavouriteImage from '../models/userFavouriteImageModel';
const router = express.Router();

router.post('/:id', async (req, res) => {
  const userId = req.params.id;
  const imageId = req.body.imageId;
});

export default router;
