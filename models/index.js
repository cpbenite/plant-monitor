var mongoose      = require('mongoose'),
    dotenv        = require('dotenv').config();

// Load dotenv into app
//dotenv.load();

// Configure Mongoose
mongoose.set('debug', true);
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useFindAndModify: false });

// Debugging
mongoose.promise = Promise;

module.exports.Settings = require('./settings');
module.exports.Stats = require('./statistics');
module.exports.Data = require('./data');
