// add express and set the router
const router = require("express").Router();

// require the controllers
const authorsControllers = require("../controllers/authors");

// GET ALL
router.get("/", authorsControllers.getAll);

// GET BY ID
router.get("/:id", authorsControllers.getSingle);

module.exports = router;
