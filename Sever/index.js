import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import user from "./routers/user";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/user", user);

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.8mgr7qd.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
