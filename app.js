const express = require("express");

const app = express();

app.set("trust proxy", 1);
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});

// send requests to the router
app.use("/", require("./routes"));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error("Request error:", message);
  res.status(status).json({ message });
});

module.exports = app;
