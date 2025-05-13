import express, { Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import cookieParser from 'cookie-parser'; // Import cookie-parser
import cors from "cors";
import 'express-async-errors';
import { errorHandler } from "@himanshusarmaorg/common";
import { paymentsIndexRouter } from "./routes";
// import createConnectionHandler from "./db/connectionHandler";

const app = express();

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000", "http://127.0.0.1:3000",
  "http://localhost:4000", "http://127.0.0.1:4000",
  "http://localhost:5173", "http://127.0.0.1:5173",
  "http://abc.com",
  "http://himanshu123abc.com"
];

// Define allowed methods
const allowedMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"];

// Define allowed headers
const allowedHeaders = ["Content-Type", "Authorization", "Accept", "X-Requested-With"];

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  // Check if the origin is in the allowed list
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    // **Crucially, set Access-Control-Allow-Credentials to true**
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  // Set allowed methods
  res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(", "));

  // Set allowed headers
  res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", "));

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.sendStatus(204); // Respond with No Content
  } else {
    next();
  }
});

app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    httpOnly: false,
    sameSite: false,
    // domain: process.env.NODE_ENV === 'production' ? '.ticketing.dev' : "localhost",
    path: '/'
    // secure: process.env.NODE_ENV !== "test"
  })
);

app.use(
  paymentsIndexRouter
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export {
  app
};