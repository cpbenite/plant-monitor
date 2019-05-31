// Initialize Express & its Router
var express     = require('express'),
    db          = require('../models'),
    router      = express.Router();
const { ensureAuthenticated } = require('../config/auth');


// Home Route
router.get('/', ensureAuthenticated, (req, res) => {

  var setting;
  var water;

  db.Settings.findOne({})
    .then( function(result) {
      console.log("Result: " + result);
      setting = result;
      return db.Water.findOne();
    })
    .then( function(waterResult) {
      water = waterResult;
      console.log("Water: " + water);
      return db.Stats.findOne();
    })
    .then( function(statResult) {

      console.log("Stat result: " + statResult);
      var timeInMoist = statResult.timeInMoist / statResult.timeInTotal;
      var timeInHot = statResult.timeInHot / statResult.timeInTotal;
      var timeInCold = statResult.timeInCold / statResult.timeInTotal;
      var timeInHumid = statResult.timeInHumid / statResult.timeInTotal;
      var timeInDry = statResult.timeInDry / statResult.timeInTotal;
      var timeOn = statResult.timeOn / statResult.timeInTotal;

      var stat = {
        avgTemperature: statResult.avgTemperature.toFixed(2),
        avgHumidity: statResult.avgHumidity.toFixed(2),
        avgBrightness: statResult.avgBrightness.toFixed(2),
        avgMoistness: statResult.avgMoistness.toFixed(2),
        temperatureData: [timeInHot, 1-timeInHot-timeInCold, timeInCold],
        humidityData: [timeInHumid, 1-timeInHumid-timeInDry, timeInDry],
        onData: [timeOn, 1-timeOn],
        moistData: [timeInMoist, 1-timeInMoist]
      };

      res.render('home', {settings: setting, stats: stat, waters: water});
    })
    .catch( function(err) {
      // console.log("Error: " + err);
      res.send(err);
    })
});

// Details Route
router.get('/details', ensureAuthenticated, (req, res) => {
  // Grab all data, limit to 24 readings, sort by most recent
  db.Data.find().limit(24).sort({timestamp: -1})
    .then( function(data){
      var times = [];
      var temperatures = [];
      var humidities = [];
      var brightnesses = [];
      var moistnesses = [];

      console.log("Data: " + data);
      data.forEach( function (reading) {
        times.push("'" + reading.timestamp + "'");
        temperatures.push(reading.temperature);
        humidities.push(reading.humidity);
        brightnesses.push(reading.brightness);
        moistnesses.push(reading.moistness);
      });

      res.render('details', { data: data,
                              temperature: temperatures.reverse(),
                              humidity: humidities.reverse(),
                              brightness: brightnesses.reverse(),
                              moistness: moistnesses.reverse(),
                              times: times.reverse()
      });
    })
    .catch( function(err){
      res.send(err);
    });
});

// Notification Route
router.get('/notifications', ensureAuthenticated, (req, res) => {

  var setting;
  var data;

  db.Settings.findOne({})
    .then( function(result) {
      console.log("Result: " + result);
      setting = result;
      return db.Data.findOne();
    })
    .then( function(dataResult) {
      data = dataResult;

      res.render('notifications', {settings: setting, datas: data});
    })
    .catch( function(err) {
      // console.log("Error: " + err);
      res.send(err);
    })
});

// Config Form Route
// Grab Settings, update listing, refresh home
router.post("/configure", (req, res) => {
  db.Settings.findOneAndUpdate({}, req.body.setting, {'new': true, upsert: true})
    .then( function(edited){
      console.log(edited);
      res.redirect('/');
    })
    .catch( function(err) {
      res.send(err);
    });
});

router.post("/water", (req, res) => {
  db.Water.findOneAndUpdate({}, req.body.water, {'new': true, upsert: true})
    .then( function(edited){
      console.log(edited);
      res.redirect('/');
    })
    .catch( function(err) {
      res.send(err);
    });
});


// Grab Data, update listing, refresh details
router.get('/seed/:temp/:hum/:bright/:moist', (req, res) => {
  // Store data from URL into a dictionary
  var seed = {
    temperature: req.params.temp,
    humidity: req.params.hum,
    brightness: req.params.bright,
    moistness: req.params.moist
  }

  // Create a database entry for dictionary
  db.Data.create(seed)
    .then(function(newData){
      res.redirect('/details');
    })
    .catch(function(err){
      res.send(err);
    })
})
//
// // Seed Route
// router.get('/seedStats', (req, res) => {
//   var seed = {
//     avgTemperature: 32,
//     avgHumidity: 11,
//     avgBrightness: 711,
//     timeInHot: 20,
//     timeInCold: 60,
//     timeInDry: 80,
//     timeInHumid: 8,
//     timeOn: 59,
//     timeTotal: 100
//   }
//
//   db.Stats.findOneAndUpdate({}, seed, {'new': true, upsert: true})
//     .then( function(stats) {
//       console.log(stats);
//       res.redirect('/');
//     })
//     .catch( function(err) {
//       res.send(err);
//     })
// });

// Make Routes available to App
module.exports = router;
