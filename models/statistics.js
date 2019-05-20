var mongoose      = require('mongoose');

// Define Settings Schema
var statsSchema = new mongoose.Schema({
  avgTemperature: {
    type: Number
  },
  avgHumidity: {
    type: Number
  },
  avgBrightness: {
    type: Number
  },
  timeInHot: {
    type: Number
  },
  timeInCold: {
    type: Number
  },
  timeInDry: {
    type: Number
  },
  timeInHumid: {
    type: Number
  },
  timeOn: {
    type: Number
  },
  timeInTotal: {
    type: Number,
    required: "You must increment the number of readings"
  }
});

// Set schema as a mongoose model
var Stats = mongoose.model('Stats', statsSchema);

// Export said schema to app
module.exports = Stats;
