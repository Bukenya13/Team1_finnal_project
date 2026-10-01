// add express and set the router
const router = require("express").Router();

// require the controllers
const booksControllers = require("../controllers/books");

// GET ALL
router.get("/", booksControllers.getAll);

// GET BY ID
router.get("/:id", booksControllers.getSingle);

// CREATE
router.post("/", booksControllers.createBook);

// UPDATE
router.put("/:id", booksControllers.updateBook);

// DELETE
router.delete("/:id", booksControllers.deleteBook);

module.exports = router;
