const router = require("express").Router();
const controller = require("../controllers/loads.js");
const { validateLoad, validateUser } = require("../validation/validation.js");
const { handleValidationErrors, isAuthenticated } = require("../middleware/validationHandler.js");


// get routes
router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);

// post routes
router.post("/",
    validateUser,
    validateLoad,
    handleValidationErrors,
    isAuthenticated,
    controller.createLoad);

// delete routes
router.delete("/:id", controller.deleteLoad);

// update routes
router.put("/:id", 
    validateLoad,
    handleValidationErrors,
    isAuthenticated,
    controller.updateLoad);

module.exports = router;