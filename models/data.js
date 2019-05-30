var mongoose      = require('mongoose');

// Define Settings Schema
var dataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  temperature: {
    type: Number,
    required: 'Must record'
  },
  humidity: {
    type: Number,
    required: 'Must record'
  },
  brightness: {
    type: Number,
    required: 'Must record'
  },
  moistness: {
    type: Number,
    required: 'Must record'
  },
  v_load: {
    type: Number
  },
  v_solar: {
    type: Number
  }
});

// Set schema as a mongoose model
var Data = mongoose.model('Data', dataSchema);

// Export said schema to app
module.exports = Data;
