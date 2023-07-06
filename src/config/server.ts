import mongoose from 'mongoose';
import app from './app';
import config from '.';
import { Server } from 'http';
process.on('uncaughtException', error => {
 console.log(error);
  process.exit(1);
});

let server: Server;
async function mainserver() {
  try {
    await mongoose.connect(config.databse_url as string);
    console.log('Database Connection Successful');

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failled to connect', error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
      console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
mainserver();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
