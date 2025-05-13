import * as dotenv from "dotenv";
dotenv.config();
import eventBusConnectionHandler from './events/eventBusConnectionHandler';

// const port = 3000;

// app.listen(port, async () => {
//   console.log(`Server listening at port: ${port}`);
//   try {
//     await eventBusConnectionHandler();
//     await createConnectionHandler();
//     // await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`)
//   } catch (err) {
//     console.log("error: ", err);
//   }
// });

const runApp = async () => {
  try {
    await eventBusConnectionHandler();
    // await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`)
  } catch (err) {
    console.log("error: ", err);
  }
}

runApp();