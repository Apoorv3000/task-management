import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import statusRoutes from "./routes/statusRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

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

// middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
//remove the mongoose warning

mongoose.set("strictQuery", true);

// port
const port = process.env.PORT || 5001;

//routes
app.use("/api/status", statusRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// base api
app.get("/", (req, res) => {
  res.json("Hello");
});

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
