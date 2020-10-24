import mongoose, { Schema } from 'mongoose';

const userFavouriteImageSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  favoriteImages: { type: Schema.Types.ObjectId, required: true },
});

const userFavouriteImageModel = mongoose.model(
  'UserFavouriteImage',
  userFavouriteImageSchema
);

export default userFavouriteImageModel;
