var db    = require('../models');

exports.getWater = function(req, res) {
  db.Water.findOne({})
    .then( function(water) {
      res.json(water);
    })
    .catch( function(err) {
      res.send(err);
    });
}

exports.editWater = function(req, res) {
  db.Water.findOneAndUpdate({}, req.body, {'new': true, upsert: true})
    .then( function(editedWater) {
      res.json(editedWater);
    })
    .catch( function(err) {
      res.send(err);
    });
}
