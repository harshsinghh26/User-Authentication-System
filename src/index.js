import dotenv from 'dotenv';
import dbConnection from './db/index.js';
import app from './app.js';
import { asyncHandler } from './utils/AsyncHandler.js';

dotenv.config();

// dbConnection()
//   .then(() => {
//     app.listen(process.env.PORT || 4000, () => {
//       console.log(`app is listening no Port: ${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log('Connection Error: ', error);
//   });

dbConnection().then(() => {
  app.listen(
    process.env.PORT || 4000,
    asyncHandler(async () => {
      console.log(`app is listening no Port: ${process.env.PORT}`);
    }),
  );
});
