var express         = require('express'),
    router          = express.Router(),
    db              = require('../models'),
    dataHelpers     = require('../helpers/data'),
    statHelpers     = require('../helpers/statistics'),
    settingsHelpers = require('../helpers/settings');

// Sensor readings
// Get, Post, and Delelte request for each database model

router.route('/data')
  .get(dataHelpers.getData)
  .post(dataHelpers.createData)
  .delete(dataHelpers.deleteData);


router.route('/data/:id')
  .get(dataHelpers.getOneData)
  .post(dataHelpers.editData)
  .delete(dataHelpers.deleteOneData);


router.route('/statistics')
  .get(statHelpers.getStats)
  .post(statHelpers.editStats)
  .delete(statHelpers.resetStats);
//
//
router.route('/settings')
  .get(settingsHelpers.getSettings)
  .put(settingsHelpers.editSettings);

module.exports = router;
