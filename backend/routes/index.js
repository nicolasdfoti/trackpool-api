const router = require("express").Router();
const loadsRoute = require("./loads");
const userRoute = require("./user.js");
const infoRoute = require("./requests.js")
const swaggerRoute = require("./swagger.js")
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
})

router.use("/information", infoRoute);
router.use("/loads", loadsRoute);
router.use("/user", userRoute);
router.use("/trackpool-doc", swaggerRoute);

module.exports = router;