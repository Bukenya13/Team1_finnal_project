// add express and set the router
const router = require("express").Router();

// require the controllers
const categoriesControllers = require("../controllers/categories");

// GET ALL
router.get("/", categoriesControllers.getAll);

// GET BY ID
router.get("/:id", categoriesControllers.getSingle);

// CREATE
router.post("/", (req, res, next) => {
	/* #swagger.parameters['body'] = {
		in: 'body',
		required: true,
		schema: {
			name: "Classic Fiction",
			description: "Timeless novels considered part of the literary canon."
		}
	} */
	categoriesControllers.createCategory(req, res, next);
});

// UPDATE
router.put("/:id", (req, res, next) => {
	/* #swagger.parameters['body'] = {
		in: 'body',
		required: true,
		schema: {
			name: "Classic Fiction",
			description: "Timeless novels considered part of the literary canon."
		}
	} */
	categoriesControllers.updateCategory(req, res, next);
});

// DELETE
router.delete("/:id", categoriesControllers.deleteCategory);

module.exports = router;
