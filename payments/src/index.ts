import 'express-async-errors';
import * as dotenv from "dotenv";
dotenv.config();
import createConnectionHandler from "./db/connectionHandler";
import { app } from "./app";
import { natsWrapper } from "./natsWrapper"; 
import eventBusConnectionHandler from './events/eventBusConnectionHandler';

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Server listening at port: ${port}`);
  try {
    await createConnectionHandler();
    await eventBusConnectionHandler();
    // await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`)
  } catch (err) {
    console.log("error: ", err);
  }
});