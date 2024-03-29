import express from 'express';
import mongoose from 'mongoose';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import userRoute from './routes/userRoute';
import imageRoute from './routes/imageRoute';
import bodyParser from 'body-parser';
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected Database🚀'))
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('welcome to wallpaper app');
});

app.use('/api/users', userRoute);
app.use('/api/images', imageRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
