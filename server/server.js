import express from 'express';
import mongoose from 'mongoose';
import Image from './models/ImageModel';
import userRoute from './routes/userRoute';
import bodyParser from 'body-parser';
const cors = require('cors');
const images = require('./Images.json');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected Database🚀'))
  .catch((error) => console.log(error));

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoute);
app.get('/', (req, res) => {
  //res.json(images);
  Image.find({}, (error, docs) => {
    res.send(docs);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
