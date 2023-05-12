const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfully");
  })
  .catch((err) => {
    console.error(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on Port ${process.env.PORT}`);
});
