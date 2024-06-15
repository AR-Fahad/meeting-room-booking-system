/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    server = app.listen(config.port, () => {
      console.log(`App is listening on port...`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

// for unhandledRejection (asynchronous)
process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected, shutting down the server...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// for uncaughtException (synchronous)
process.on('uncaughtException', () => {
  console.log('uncaughtException is detected, shutting down the server...');
  process.exit(1);
});
