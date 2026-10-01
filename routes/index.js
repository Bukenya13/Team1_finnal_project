// add express and set the router
const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=["Health Check"]
  res.send("Library Management API is running");
});

router.use("/books", require("./books"));

router.use("/authors", require("./authors"));

module.exports = router;
