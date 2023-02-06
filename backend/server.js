import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

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

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// connects to the server
app.listen(port, () => {
  connect();
  console.log("Connected to server at port: " + port);
});
