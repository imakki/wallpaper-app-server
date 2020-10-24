import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  favouriteImage: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
