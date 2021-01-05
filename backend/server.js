const express = require("express");
const mongoose = require("mongoose");
const bodyPaser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const app = express();
const port = process.env.PORT || 5000;

// Middelwears
app.use(cors());
app.use(bodyPaser.json());

// MongoDB connection
mongoose.connect(
  process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("dataBase connected Successfully");
  }
);

// Import Routes
const postRoute = require("./routes/postRoute");

// Route middlewear
app.use("/posts", postRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
