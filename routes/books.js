// add express and set the router
const router = require("express").Router();

// require the controllers
const booksControllers = require("../controllers/books");

// GET ALL
router.get("/", booksControllers.getAll);

// GET BY ID
router.get("/:id", booksControllers.getSingle);

// CREATE
router.post("/", (req, res, next) => {
	/* #swagger.parameters['body'] = {
		in: 'body',
		required: true,
		schema: {
			title: "Example title",
			isbn: "978-0-00-000000-0",
			authorId: "A004",
			categoryId: "C001",
			publishedYear: 2025,
			pages: 100,
			summary: "Example summary"
		}
	} */
	booksControllers.createBook(req, res, next);
});

// UPDATE
router.put("/:id", (req, res, next) => {
	/* #swagger.parameters['body'] = {
		in: 'body',
		required: true,
		schema: {
			title: "Example title",
			isbn: "978-0-00-000000-0",
			authorId: "A004",
			categoryId: "C001",
			publishedYear: 2025,
			pages: 100,
			summary: "Example summary"
		}
	} */
	booksControllers.updateBook(req, res, next);
});

// DELETE
router.delete("/:id", booksControllers.deleteBook);

module.exports = router;
