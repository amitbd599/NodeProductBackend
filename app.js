const express = require("express");
const router = require("./src/Routers/API");
const app = new express();
const bodyParser = require("body-parser");

//! Security Middleware

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//! ENV

const dotENV = require("dotenv");
dotENV.config();

//! Security Middleware implements

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "100mb" }));

//! BodyParser implements

app.use(bodyParser.json());

//! Rate Limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter);

//! Database

const mongoose = require("mongoose");

//! Database Connect

// const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mycluster.gxni9wo.mongodb.net/portfolio-amitJs?retryWrites=true&w=majority`;

const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fsp0qs4.mongodb.net/ProductData?retryWrites=true&w=majority`;

mongoose.connect(
  URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    console.log("MongoDB are Connect!");
    console.log(error);
  }
);

//! Frontend URL Tagging API
app.use("/api/v1", router);

module.exports = app;
