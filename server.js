const dotenv = require("dotenv");
dotenv.config();

const mongodb = require("./data/database");
const app = require("./app");

const PORT = process.env.PORT || 5000;

mongodb.initDb((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  app.listen(PORT, () => {
    console.log(`Database is connected and Node is running on port ${PORT}`);
  });
});
