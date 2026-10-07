const express = require("express");
const session = require("express-session");

const app = express();

app.set("trust proxy", 1);
app.use(express.json());

// Session middleware for GitHub OAuth
app.use(
  session({
    secret: process.env.SESSION_SECRET || "library-management-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

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
