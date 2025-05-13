import 'express-async-errors';
import * as dotenv from "dotenv";
dotenv.config();
import createConnectionHandler from "./db/connectionHandler";
import { app } from "./app";
import { natsWrapper } from "./natsWrapper"; 
import eventBusConnectionHandler from './events/eventBusConnectionHandler';

const port = 3000;

const connectDBHandler = async () => {
  try {
    // await eventBusConnectionHandler();
    await createConnectionHandler();
    // await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`)
  } catch (err) {
    console.log("DB connection error: ", err);
  }
};

const eventBusListenersHandler = async () => {
  try {
    await eventBusConnectionHandler();
    // await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`)
  } catch (err) {
    console.log("event bus Listener error: ", err);
  }
};

app.listen(port, async () => {
  console.log(`Server listening at port: ${port}`);
  await connectDBHandler();
  await eventBusListenersHandler();
});