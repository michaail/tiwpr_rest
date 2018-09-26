const Segment = require('../models/segment.model');
const User = require('../models/user.model');

// Creates new Activity
exports.create = (req, res) => {
  if (!req.body.length) {
    return res.status(400).send({
      message: "Activity can't be posted without length"
    });
  }

  // Create object
  const segment = new Segment({
    name:     req.body.name   || "unnamed",
    length:   req.body.length,
    time:     req.body.time   || "0:00:00",
    incline:  req.body.incline,
    author:   req.body.user   || "unknown"
  });

  if(req.body.user) {
    User.findById(req.body.user, (err, user) => {
      if (err) throw new Error(err);

      user.segments.push(segment);
      user.save((err) => { });
    });
  }
  
  // save what created to db
  segment.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "smth went wrong on creating segment"
      });
    });
};

// Retrieve whole collection from db
exports.findAll = (req, res) => {
  Segment.find()
    .populate('segment')
    .then(segments => {
      res.send(segments);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "smth went wrong on retrieving segments"
      });
    });
};

// Retrieve single object from db
exports.findOne = (req, res) => {
  Segment.findById(req.params.segId)
    .then(segment => {
      if (!segment) {
        return res.status(404).send({
          message: "Segment with id: " + req.params.segId + " not found"
        });
      }
      res.send(segment);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Segment with id: " + req.params.segId + " not found"
        });
      }
      return res.status(500).send({
        message: "Error with get segment id: " + req.params.segId

      });
    });
};

// Update single object
exports.update = (req, res) => {
  Segment.findByIdAndUpdate(req.params.segId, 
                             req.body,
                             {new: true})
    .then(segment => {
      if(!segment) {
        return res.status(404).send({
          message: "segment " + req.params.segId
        });
      }
      res.send(segment);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "segment " + req.params.segId
        });
      }
      return res.status(500).send({
        message: "Error with update segment id: " + req.params.segId
      });
    });
};

// Delete single object
exports.delete = (req, res) => {
  Segment.findByIdAndRemove(req.params.segId)
    .then(segment => {
      if(!segment) {
        return res.status(404).send({
          message: "segment" + req.params.segId
        });
      }
      res.send({message: "Segment deleted!"});
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "segment" + req.params.segId
        });
      }
      return res.status(500).send({
        message: "Error with delete activity id: " + req.params.segId
      });
    });
};


exports.findAllSegmentUsers = (req, res) => {
  Segment.findById(req.params.segId)
    .then(segment => {
      if (!segment) {
        return res.status(404).send({
          message: "segment " + req.params.segId
        })
      }

      User.find({segments: req.params.segId})
        .then(users => {
          if (!users) {
            return res.status(404).send({
              message: "users with segment: " + req.params.segId
            });
          }
          res.send(users)
        });

    }).catch(err => {
      res.status(500).send({
        message: err.message || "smth went wrong on retrieving segments"
      });
    });
}

exports.findAllActivitiesWithSegment = (req, res) => {
  Segment.findById(req.params.segId)
    .then(segment => {
      if (!segment) {
        return res.status(404).send({
          message: "segment " + req.params.segId
        });
      }
      


    }).catch(err => {

    });
}

