import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import imageRoute from './routes/imageRoute';
import bodyParser from 'body-parser';
const cors = require('cors');
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
app.use('/api/images', imageRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT || 8000}`);
});
