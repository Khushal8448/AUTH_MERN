import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

const app = express();
dotenv.config();

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
