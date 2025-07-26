// requirements
const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");
const mongodb = require("./database/database.js");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const GitHubStrategy = require("passport-github2").Strategy;

// initializing the app
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// port
const PORT = 3000;

// static resources
app.use(express.static(path.join(__dirname, "../frontend")));

// routes
app.use(routes);

app.get("/", (req, res) => {
    res.send((req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "Logged out"));
})

app.get("/github/callback", passport.authenticate('github', {
    failureRedirect: "/trackpool-doc"
}), (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
});

// middleware
passport.use(new GitHubStrategy({

        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },

    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
))

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// app listening to port
mongodb.initDb((err) => {
    if (err) {
        console.error("There was a mistake" + err)
    } else {
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        })
    }
})