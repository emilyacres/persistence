var router = require('express').Router();
var Day = require('../../models').Day;

//get all days
router.get('/', function (req, res, next){

});

//get specific day
router.get('/:id', function (req, res, next){
    let obj = {};
    Day.findOne({where: {id: req.params.id}})
    .then(function (day){
        day.getHotel()
        .then(function(hotel){
            obj.hotel = hotel;
            return day.getActivities()
        })
        .then(function(activities){
            obj.activities = activities;
            return day.getRestaurants()
        })
        .then(function(restaurants){
            obj.restaurants = restaurants;
            res.send(obj);
        });
    });
});

//create new day
router.post('/', function (req, res, next){
    Day.create({
        number: req.body.number
    })
    .then(function (day){
        res.send(day)
    })
    .catch(next);
});

//delete specific day
router.put('/:id', function (req, res, next){

});

//add restaurant to specific day
router.post('/:id/restaurants', function (req, res, next){

    Day.findById(req.params.id)
    .then(function (day){
        console.log('got to router');
       return day.addRestaurant(req.body.id)
    })
    .then(function(data){
        res.send(data)
        console.log('You added a restaurant')
    })
    .catch(console.error);

});

//add activity to specific day
router.post('/:id/activities', function (req, res, next){
    Day.findById(req.params.id)
    .then(function (day){
        console.log('got to router');
       return day.addActivity(req.body.id)
    })
    .then(function(data){
        res.send(data)
        console.log('You added a restaurant')
    })
    .catch(console.error);
});

//add hotel to specific day
router.post('/:id/hotels', function (req, res, next){
    Day.findById(req.params.id)
    .then(function (day){
        console.log('got to router');
       return day.setHotel(req.body.id)
    })
    .then(function(data){
        res.send(data)
        console.log('You added a restaurant')
    })
    .catch(console.error);
});

//delete restaurant from specific day
// router.put('/:id/restaurants', function (req, res, next){

// });

//delete activity from specific day
router.put('/:id/activities', function (req, res, next){

});

//delete hotel from specific day
router.put('/:id/hotels', function (req, res, next){

});





module.exports = router;
