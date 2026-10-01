// add express and set the router
const router = require("express").Router();

// require the controllers
const authorsControllers = require("../controllers/authors");

// GET ALL
router.get("/", authorsControllers.getAll);

// GET BY ID
router.get("/:id", authorsControllers.getSingle);

// CREATE
router.post("/", (req, res, next) => {
	/* #swagger.parameters['body'] = {
		in: 'body',
		required: true,
		schema: {
			firstName: "Gabriel",
			lastName: "Garcia Marquez",
			birthDate: "1927-03-06",
			nationality: "Colombian",
			biography: "Example biography",
			books: ["B004"],
			awards: ["Nobel Prize in Literature"]
		}
	} */
	authorsControllers.createAuthor(req, res, next);
});

// UPDATE
router.put("/:id", (req, res, next) => {
	/* #swagger.parameters['body'] = {
		in: 'body',
		required: true,
		schema: {
			firstName: "Gabriel",
			lastName: "Garcia Marquez",
			birthDate: "1927-03-06",
			nationality: "Colombian",
			biography: "Example biography",
			books: ["B004"],
			awards: ["Nobel Prize in Literature"]
		}
	} */
	authorsControllers.updateAuthor(req, res, next);
});

// DELETE
router.delete("/:id", authorsControllers.deleteAuthor);

module.exports = router;
