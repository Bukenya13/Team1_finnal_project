const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongodb = require("./data/database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});

// send requests to the router
app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  app.listen(PORT, () => {
    console.log(`Database is connected and Node is running on port ${PORT}`);
  });
});
