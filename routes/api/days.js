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
    Day.findOne({
        where: {
            number: req.body.number
        }
    })
    .then(function(data){
        if (data) return
        else {
            Day.create({
                number: req.body.number
            })
            .then(function (day){
                res.send(day)
            })
            .catch(next);
        }
    })
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
router.delete('/:id/restaurants/:attractionId', function (req, res, next){
    Day.findById(req.params.id)
    .then(function(day){
        return day.({
            where: {
                restaurantId: req.params.attractionId
            }
        })
    })
    .then(function(restaurant){
        restaurant.destroy()
    })
    .catch(console.error);
});

//delete activity from specific day
router.delete('/:id/activities/:attractionId', function (req, res, next){
            console.log('HEYYY')
    Day.findById(req.params.id)
    .then(function(day){
        return day.getActivity({
            where: {
                activityId: req.params.attractionId
            }
        })
    })
    .then(function(activity){
        activity.destroy()
    })
    .catch(console.error);
});

//delete hotel from specific day
router.delete('/:id/hotel', function (req, res, next){
    Day.findById(req.params.id)
    .then(function(day){
        return day.getHotel()
    })
    .then(function(hotel){
        hotel.destroy()
    })
    .catch(console.error)
});





module.exports = router;
