const router = require("express").Router();
const controller = require("../controllers/loads.js");
const { validateContact } = require("../validation/validation.js");
const errorHandling = require("../middleware/validationHandler.js");

// get routes
router.get("/", controller.getAll);
router.get("/:id", controller.getSingle);

// post routes
router.post("/",
    validateContact,
    errorHandling,
    controller.createLoad);

// delete routes
router.delete("/:id", controller.deleteLoad);

// update routes
router.put("/:id", 
    validateContact,
    errorHandling,
    controller.updateLoad);

module.exports = router;