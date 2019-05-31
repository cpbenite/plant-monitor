var mongoose      = require('mongoose'),
    dotenv        = require('dotenv').config();

// Load dotenv into app
//dotenv.load();

const db = require('../config/keys').mongoURI;

// Configure Mongoose
mongoose.set('debug', true);
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false });

// Debugging
mongoose.promise = Promise;

module.exports.Settings = require('./settings');
module.exports.Stats = require('./statistics');
module.exports.Data = require('./data');
module.exports.User = require('./User');
module.exports.Water = require('./water');
