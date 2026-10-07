// add express and set the router
const router = require("express").Router();

// require the controllers and the session auth middleware
const authorsControllers = require("../controllers/authors");
const { requireAuth } = require("../middleware/auth");

// GET ALL
router.get("/", authorsControllers.getAll);

// GET BY ID
router.get("/:id", authorsControllers.getSingle);

// CREATE (protected by GitHub OAuth session)
router.post("/", requireAuth, (req, res, next) => {
	authorsControllers.createAuthor(req, res, next);
});

// UPDATE (protected by GitHub OAuth session)
router.put("/:id", requireAuth, (req, res, next) => {
	authorsControllers.updateAuthor(req, res, next);
});

// DELETE
router.delete("/:id", authorsControllers.deleteAuthor);

module.exports = router;