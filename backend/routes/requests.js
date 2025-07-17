const router = require("express").Router();
const controller = require("../controllers/loads.js");

router.get("/", controller.getAllInfo);

module.exports = router;