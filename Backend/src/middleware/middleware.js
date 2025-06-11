const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const logStream = fs.createWriteStream(
  path.join(__dirname, "../../access.log"),
  {
    flags: "a",
  }
);

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(morgan("short", { stream: logStream }));
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
};
