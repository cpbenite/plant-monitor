var db    = require('../models');

exports.getData = function (req, res) {
  db.Data.find()
    .then( function(data) {
      res.json(data);
    })
    .catch( function(err) {
      res.send(err);
    })
}

exports.createData = function (req, res) {
  db.Data.create(req.body)
    .then( function(data){
      res.json(data);
    })
    .catch( function(err) {
      res.send(err);
    })
}


exports.deleteData = function (req, res) {
  db.Data.remove({})
    .then( function(data) {
      res.json({message: 'Data wiped.'})
    })
    .catch( function(err) {
      res.send(err);
    })
}

exports.getOneData = function (req, res) {
  db.Data.findById(req.params.id)
    .then( function(data) {
      res.json(data)
    })
    .catch( function(err) {
      res.send(err);
    })
}

exports.editData = function (req, res) {
  db.Data.findOneAndUpdate({ _id: req.params.id}, req.body, {'new': true, upsert: true})
    .then( function(data) {
      res.json(data)
    })
    .catch( function(err) {
      res.send(err);
    })
}

exports.deleteOneData = function (req, res) {
  db.Data.remove( { _id: req.params.id} )
    .then( function(data) {
      res.json({message: 'Data ID deleted.'})
    })
    .catch( function(err) {
      res.send(err);
    })
}
