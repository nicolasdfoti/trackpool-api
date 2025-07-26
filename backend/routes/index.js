const router = require("express").Router();
const loadsRoute = require("./loads");
const userRoute = require("./user.js");
const infoRoute = require("./requests.js")
const swaggerRoute = require("./swagger.js")
const path = require("path");
const passport = require("passport");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
})

router.use("/information", infoRoute);
router.use("/loads", loadsRoute);
router.use("/user", userRoute);
router.use("/trackpool-doc", swaggerRoute);

// login routes
router.get("/github/callback", passport.authenticate('github', {
    failureRedirect: "/trackpool-doc"
}), (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
});

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
    req.logOut(function(err) {
        if (err) {
            return next(err)
        }
        res.redirect("/");
    })
})

module.exports = router;