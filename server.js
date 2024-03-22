import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
dotenv.config();
const app = express();
import mongoose from "mongoose";
import CookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// router
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

// middlewares
import errorHandlerMiddleware from "./Middlewares/errorHandlerMiddleware.js";
import { validateTest } from "./Middlewares/validationHandlerMiddleware.js";
import { validateUser } from "./Middlewares/authMiddleware.js";

const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(CookieParser());
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
// app.disable("etag"); //disable caching for all

app.post("/api/v1/test", validateTest, (req, res) => {
  const { name } = req.body;
  res.status(200).json({ msg: `your name is: ${name}` });
});
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ msg: `your name is:` });
});
//Router
app.use("/api/v1/jobs", validateUser, jobRouter);
app.use("/api/v1/users", validateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist", "index.html")); // dot in "./client/dist" or nothing
});
//Not Found Controller for when the requested api route does not exist
app.use("*", (req, res) => {
  res.status(404).json({ msg: "route not found!" });
});

//Server Error Controller to handle server errors or errors thrown manually
app.use(errorHandlerMiddleware);

let connect = null;
try {
  connect = await mongoose.connect(process.env.MONGODB_URI);
} catch (error) {
  console.log(error);
}

if (connect) {
  app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });
}
