// add express and set the router
const router = require("express").Router();

// require the controllers
const booksControllers = require("../controllers/books");

// GET ALL
router.get("/", booksControllers.getAll);

// GET BY ID
router.get("/:id", booksControllers.getSingle);

module.exports = router;
