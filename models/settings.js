var mongoose      = require('mongoose');

// Define Settings Schema
var settingSchema = new mongoose.Schema({
  defaultColor: {
    type: String
  },
  lightColor: {
    type: String
  },
  lightIsOn: {
    type: Boolean
  },
  hotThreshold: {
    type: Number
  },
  coldThreshold: {
    type: Number
  },
  humidThreshold: {
    type: Number
  },
  dryThreshold: {
    type: Number
  },
  darkThreshold: {
    type: Number
  }
});

// Set schema as a mongoose model
var Settings = mongoose.model('Settings', settingSchema);

// Export said schema to app
module.exports = Settings;
