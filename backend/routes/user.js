const router = require("express").Router();
const controller = require("../controllers/loads.js");
const { validateUser } = require("../validation/validation.js");
const errorHandling = require("../middleware/validationHandler.js");

// get routes
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getSingleUser);

// update routes
router.put("/:id", 
    validateUser,
    errorHandling,
    controller.updateUser);

module.exports = router;