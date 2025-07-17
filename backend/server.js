// requirements
const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");
const mongodb = require("./database/database.js");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");

// initializing the app
const app = express();
app.use(cors());

// port
const PORT = 3000;

// static resources
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.json());

// routes
app.use(routes);

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