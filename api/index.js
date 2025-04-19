const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const quiz_route = require("./routes/quiz_route");

const port = 3000;

// env
dotenv.config();

app.use(express.urlencoded({ extended: true }));

// to use json in express
app.use(express.json());

// set up cors
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    // "https://",
  ],

  allowedHeaders: ["Authorization", "Content-Type"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  optionSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("You are now connected to mongodb");
    app.listen(port, () => {
      console.log(`Listening to requests coming from port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", quiz_route);
