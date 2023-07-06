/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  databse_url: process.env.DATABASE_URL,
  default_user_password: process.env.DEFAULT_USER_PASSWORD,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt:{
    secret:process.env.JWT_SECRET,
    refresh_secret:process.env.JWT_REFRESH_SECRET,
    token_expires_in:process.env.JWT_EXPIRES_IN,
    refresh_expires_in:process.env.JWT_REFRSH_EXPIRES_IN
  }
};
