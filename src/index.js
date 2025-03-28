import dotenv from 'dotenv';
import dbConnection from './db/index.js';
import app from './app.js';

dotenv.config();

dbConnection()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`app is listening no Port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log('Connection Error: ', error);
  });
