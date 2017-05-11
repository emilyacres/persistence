var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var apiHotel = require('./api/hotels');
var apiRestaurant = require('./api/restaurants');
var apiActivity = require('./api/activities');
var apiDay = require('./api/days');

router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  })
  .catch(next);
});



router.use('/api/hotels', apiHotel);

router.use('/api/restaurants', apiRestaurant);

router.use('/api/activities', apiActivity);

router.use('/api/days', apiDay);

module.exports = router;
