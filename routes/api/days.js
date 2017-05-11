var router = require('express').Router();
var Day = require('../../models').Day;

//get all days
router.get('/', function (req, res, next){

});

//get specific day
router.get('/:id', function (req, res, next){
    Day.findOne({where: {id: req.params.id}})
    .then(function (day){
        res.send(day);
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
        day.addRestaurant({id: req.body.id})
        .then(function(){
            console.log('You added a restaurant')
        })
        .catch(console.error)
    })
    .catch(console.error);

});

//add activity to specific day
router.post('/:id/activities', function (req, res, next){

});

//add hotel to specific day
router.post('/:id/hotels', function (req, res, next){

});

//delete restaurant from specific day
router.put('/:id/restaurants', function (req, res, next){

});

//delete activity from specific day
router.put('/:id/activities', function (req, res, next){

});

//delete hotel from specific day
router.put('/:id/hotels', function (req, res, next){

});





module.exports = router;