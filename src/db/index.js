import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
import dotenv from 'dotenv';

dotenv.config();

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

export default dbConnection;
