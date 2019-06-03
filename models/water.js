var mongoose      = require('mongoose');

// Define Settings Schema
var waterSchema = new mongoose.Schema({
  frequency: {
    type: Number
  },
  amount: {
    type: Number
  },
  last_watered: {
    type: Date
  }
});

console.log("Date: " + typeof(Date.now()));
console.log(Date.now());

// Set schema as a mongoose model
var Water = mongoose.model('Water', waterSchema);

// Export said schema to app
module.exports = Water;
