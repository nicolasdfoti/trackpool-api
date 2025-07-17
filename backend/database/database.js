const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log("Database already running");
        callback(null, database);
    } else {
        MongoClient.connect(process.env.MONGODB_URI)
            .then((client) => {
                database = client;
                callback(null, database);
            })
            .catch((error) => {
                callback(error);
            })
    }
}

const getDb = () => {
    if (!database) {
        console.error("DB already initialized");
    } else {
        return database;
    }
}

module.exports = {initDb, getDb}