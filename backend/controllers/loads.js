const mongodb = require("../database/database.js");
const ObjectId = require("mongodb").ObjectId;

// get all loads
const getAll = async (req, res) => {

    try {
        const result = await mongodb.getDb().db().collection("loads").find();
        const loads = await result.toArray();
        res.status(200).json(loads);

    } catch (err) {
        res.status(500).json({error: "Error fetching the loads", details: err});
    }
}

// get single load
const getSingle = async (req, res) => {

    try {
        const loadsId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection("loads").find({_id: loadsId});
        const loads = await result.toArray();
        res.status(200).json(loads[0]);

    } catch (err) {
        res.status(500).json({error: "Error fetching the load", details: err});
    }
}

// get all users
const getAllUsers = async (req, res) => {

    try {
        const result = await mongodb.getDb().db().collection("user").find();
        const users = await result.toArray();
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({error: "Error fetching users", details: err});
    }
    
}

// get single user
const getSingleUser = async (req, res) => {

    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection("user").find({_id: userId});
        const users = await result.toArray();
        res.status(200).json(users[0]);

    } catch (err) {
        res.status(500).json({error: "Error fetching the user", details: err});
    }
    
}

// get all information (user and load)
const getAllInfo = async (req, res) => {

    try {
        const result = await mongodb.getDb().db().collection("loads").aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $unwind: "$userInfo"
            },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    package: 1,
                    additional: 1,
                    "userInfo.name": 1,
                    "userInfo.email": 1,
                    "userInfo.plan": 1
                }
            }

        ]).toArray();

        res.status(200).json(result);

    } catch(err) {
        res.status(500).json({ error: "There was a mistake getting the information", details: err})
    }
    
}

// create load (and user)
const createLoad = async (req, res) => {

    const db = mongodb.getDb().db();

    const user = {
        name: req.body.name,
        email: req.body.email
    }

    try {
        const userResult = await db.collection("user").insertOne(user);
        const userId = userResult.insertedId;

        const load = {
            userId: userId,
            plan: req.body.plan,
            date: req.body.date,
            package: req.body.package,
            additional: req.body.additional
        }

        const loadResult = await mongodb.getDb().db().collection("loads").insertOne(load);

        if (loadResult.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(loadResult.error || "An error occured");
        }
    } catch (err) {
        res.status(500).json({error: "There was a mistake uploading the data.", details: err});
    }
}

// delete a load with its user
const deleteLoad = async (req, res) => {
  try {
        const db = mongodb.getDb().db();
        const loadId = new ObjectId(req.params.id);

        const load = await db.collection("loads").findOne({ _id: loadId });

        if (!load) {
            return res.status(404).json({ error: "Load not found" });
        } else {
            const userId = load.userId;

            const loadResult = await db.collection("loads").deleteOne({ _id: loadId });
            const userResult = await db.collection("user").deleteOne({ _id: userId });

            if (loadResult.deletedCount > 0 && userResult.deletedCount > 0) {
                res.status(204).send();
                } else {
                res.status(500).json({ error: "Error deleting load or user" });
            }
        }
    } catch (err) {
            res.status(500).json({ error: "Unexpected error", details: err });
    }
};

// update a load
const updateLoad = async (req, res) => {

    try {
        const loadId = new ObjectId(req.params.id);
        const load = {
            plan: req.body.plan,
            date: req.body.date,
            package: req.body.package,
            additional: req.body.additional
        }
        const result = await mongodb.getDb().db().collection("loads").replaceOne({_id: loadId}, load);

        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || "An error ocurred");
        }
    } catch (err) {
        res.status(500).json({error: "Error updating the load", details: err});
    }
}

// update a user
const updateUser = async (req, res) => {

    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            name: req.body.name,
            email: req.body.email,
        }

        const result = await mongodb.getDb().db().collection("user").replaceOne({_id: userId}, user);

        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || "An error ocurred");
        }
    } catch (err) {
        res.status(500).json({error: "Error updating user", details: err});
    }
}

module.exports = {getAll, getSingle, getAllUsers, getSingleUser, getAllInfo, createLoad, deleteLoad, updateLoad, updateUser};