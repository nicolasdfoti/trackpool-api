const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "Trackpool API",
        description: "This is an API designed to help companies move their loads"
    },
    host: "trackpool-api.onrender.com",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc);