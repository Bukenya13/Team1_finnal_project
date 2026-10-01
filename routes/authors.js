// add express and set the router
const router = require("express").Router();

// require the controllers
const authorsControllers = require("../controllers/authors");

// GET ALL
router.get("/", authorsControllers.getAll);

// GET BY ID
router.get("/:id", authorsControllers.getSingle);

// CREATE
router.post("/", authorsControllers.createAuthor);

// UPDATE
router.put("/:id", authorsControllers.updateAuthor);

// DELETE
router.delete("/:id", authorsControllers.deleteAuthor);

module.exports = router;
