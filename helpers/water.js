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

exports.resetWater = function (req, res) {
  var blank = {
    'frequency': 1,
    'amount': 1,
    'last_watered': Date.now()
  };

  db.Water.findOneAndUpdate({}, blank, {'new': true, upsert: true})
    .then( function(data) {
      res.json(data);
    })
    .catch( function(err) {
      res.send(err);
    });
}
