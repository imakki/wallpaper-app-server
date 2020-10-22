import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  author: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  url: { type: String, required: true },
  download_url: { type: String, required: true },
});

const imageModel = mongoose.model('Image', imageSchema);

export default imageModel;
