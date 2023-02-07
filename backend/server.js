import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import statusRoutes from "./routes/statusRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();

//db connection

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

//remove the mongoose warning

mongoose.set("strictQuery", true);

// port
const port = process.env.PORT || 5001;

//routes
app.use("/api/status", statusRoutes);
app.use("/api/category", categoryRoutes);

// middlewares

app.use(cookieParser());
app.use(express.json());
app.use(cors());

//error handling

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// listens to the server

app.listen(port, () => {
  connect();
  console.log("Connected to server at port: " + port);
});
