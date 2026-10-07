// add express and set the router
const router = require("express").Router();

// require the controllers and the session auth middleware
const booksControllers = require("../controllers/books");
const { requireAuth } = require("../middleware/auth");

// GET ALL
router.get("/", booksControllers.getAll);

// GET BY ID
router.get("/:id", booksControllers.getSingle);

// CREATE (protected by GitHub OAuth session)
router.post("/", requireAuth, (req, res, next) => {
	booksControllers.createBook(req, res, next);
});

// UPDATE (protected by GitHub OAuth session)
router.put("/:id", requireAuth, (req, res, next) => {
	booksControllers.updateBook(req, res, next);
});

// DELETE
router.delete("/:id", booksControllers.deleteBook);

module.exports = router;