import 'express-async-errors';
import * as dotenv from "dotenv";
import createConnectionHandler from "./db/connectionHandler";
import { app } from "./app";

dotenv.config({});

const port = 4000;

app.listen(port, async () => {
  console.log(`Server listening at port: ${port}`)
  try {
    await createConnectionHandler();
  } catch (err) {
    console.log("DB connection error: ", err);
  }
});