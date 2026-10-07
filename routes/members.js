// add express and set the router
const router = require("express").Router();

// require the controllers
const membersControllers = require("../controllers/members");

// GET ALL
router.get("/", membersControllers.getAll);

// GET BY ID
router.get("/:id", membersControllers.getSingle);

// CREATE
router.post("/", (req, res, next) => {
	/* #swagger.parameters['body'] = {
		in: 'body',
		required: true,
		schema: {
			firstName: "Jordan",
			lastName: "Smith",
			email: "jordan.smith@example.com",
			phone: "208-555-0142",
			membershipType: "Student"
		}
	} */
	membersControllers.createMember(req, res, next);
});

// UPDATE
router.put("/:id", (req, res, next) => {
	/* #swagger.parameters['body'] = {
		in: 'body',
		required: true,
		schema: {
			firstName: "Jordan",
			lastName: "Smith",
			email: "jordan.smith@example.com",
			phone: "208-555-0142",
			membershipType: "Graduate Student"
		}
	} */
	membersControllers.updateMember(req, res, next);
});

// DELETE
router.delete("/:id", membersControllers.deleteMember);

module.exports = router;
