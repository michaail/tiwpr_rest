const User = require('../models/user.model');
const Activitiy = require('../models/activity.model');


// Creates new User
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
exports.findAll = async (req, res) => {
    const userPromise = User.paginate({
        limit: req.query.per_page || 3,
        previous: req.query.previous || null,
        next: req.query.next || null
      });
      const countPromise = User.count();
      const [users, count] = await Promise.all([userPromise, countPromise]);
      
      const links = {};
      if (users.hasNext) {
        links.next = `${req.protocol}://${req.get('host')}${req.path}?next=${users.next}`;
      }
      if (users.hasPrevious) {
        links.previous = `${req.protocol}://${req.get('host')}${req.path}?previous=${users.next}`;
      }
      res.links(links);
      res.set('total-count', count);
      
      return res.status(200).send(users.results );

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
    User.findByIdAndUpdate(req.params.userId, 
        req.body,
        {new: true}) // zwracazmodyfikowany dokument do then()
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No user with id: " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No user with id: " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error with update user id: " + req.params.userId
        });
    });
};

// Delete single object
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "No user with id: " + req.params.userId
            });
        }
        
        Activitiy.remove({author: req.params.userId}, (err) =>{
            if (err) {
                console.log(err);
            }
        });
        

        res.send({message: "User deleted!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "No user with id: " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error with delete user id: " + req.params.userId
        });
    })
};

exports.findAllUsersActivities = (req, res) => {
    User.findById(req.params.userId)
    .populate('activity')
    .exec((err, user) => {
        res.send(user.activity);
    });
};

exports.deleteAllUsersActivities = (req, res) => {

};
