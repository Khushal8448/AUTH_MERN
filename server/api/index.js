import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) =>
    app.listen(PORT, () => {
      console.log(`MONGODB --HOST: ${res.connection.host}`, `--PORT: ${res.connection.port}`);
      console.log(`Server listening on --PORT : ${PORT}`);
    })
  )
  .catch((err) => console.error(err));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

// OnError
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statuscode).json({
    success: false,
    message,
    statuscode,
  });
});
