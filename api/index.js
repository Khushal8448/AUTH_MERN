import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) =>
    app.listen(3000, () => {
      console.log(`--HOST: ${res.connection.host}`, `--PORT: ${res.connection.port}`);
      console.log(`Server listening on --PORT : 3000`);
    })
  )
  .catch((err) => console.error(err));

// ;
