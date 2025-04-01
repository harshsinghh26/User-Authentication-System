import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
import dotenv from 'dotenv';
import { asyncHandler } from '../utils/AsyncHandler.js';

dotenv.config();

const dbConnection = asyncHandler(async () => {
  const connectionInstence = await mongoose.connect(
    `${process.env.DB_URL}/${DB_NAME}`,
  );
  console.log(
    ` \n DATABASE CONNECTED !! DB_HOST: ${connectionInstence.connection.host}`,
  );
});

export default dbConnection;

// Another Way for connection with dataBase

/*
const dbConnection = async () => {
  try {
    const connectionInstence = await mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}`,
    );
    console.log(
      ` \n DATABASE CONNECTED !! DB_HOST: ${connectionInstence.connection.host}`,
    );
  } catch (error) {
    console.log('Database connection failed ', error);
    process.exit(1);
  }
};
*/
