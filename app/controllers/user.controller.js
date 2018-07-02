const User = require('../models/user.model');


// Creates new Activity
exports.create = (req, res) => {
    if (!req.body.name && !req.body.email) {
        return res.status(400).send({
            message: "User can't be posted without name or email"
        });
    }

    // Create object
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        bike: req.body.bike || "",
        segments: req.body.segments
    });
    
    // save what created to db
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "smth went wrong on creating user"
        });
    });
};

// Retrieve whole collection from db
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "smth went wrong on retrieving users"
        })
    })
};

// Retrieve single object from db
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User with id: " + req.params.userId + " not found"
            });
        }
        res.send(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User with id: " + req.params.userId + " not found"
            });
        }
        return res.status(500).send({
            message: "Error with get user id: " + req.params.userId

        });
    });
};

// Update single object
exports.update = (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || name,
        email: req.body.email || email,
        bike: req.body.bike || bike,
        segments: req.body.segments || segments
    }, {new: true}) // zwracazmodyfikowany dokument do then()
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No user with id: " + req.params.actId
            });
        }
        res.send(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No user with id: " + req.params.actId
            });
        }
        return res.status(500).send({
            message: "Error with update user id: " + req.params.actId
        });
    });
};

// Delete single object
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No user with id: " + req.params.actId
            });
        }
        res.send({message: "User deleted!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "No user with id: " + req.params.actId
            });
        }
        return res.status(500).send({
            message: "Error with delete user id: " + req.params.actId
        });
    })
};
