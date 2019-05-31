var mongoose      = require('mongoose');

// Define Settings Schema
var settingSchema = new mongoose.Schema({
  hotThreshold: {
    type: Number
  },
  coldThreshold: {
    type: Number
  },
  humidThreshold: {
    type: Number
  },
  darkThreshold: {
    type: Number
  },
  moistThreshold: {
    type: Number
  }
});

// Set schema as a mongoose model
var Settings = mongoose.model('Settings', settingSchema);

// Export said schema to app
module.exports = Settings;
