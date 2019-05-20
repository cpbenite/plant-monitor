var db    = require('../models');

exports.getSettings = function(req, res) {
  db.Settings.findOne({})
    .then( function(settings) {
      res.json(settings);
    })
    .catch( function(err) {
      res.send(err);
    });
}

exports.editSettings = function(req, res) {
  db.Settings.findOneAndUpdate({}, req.body, {'new': true, upsert: true})
    .then( function(editedSettings) {
      res.json(editedSettings);
    })
    .catch( function(err) {
      res.send(err);
    });
}
