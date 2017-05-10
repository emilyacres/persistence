var router = require('express').Router();
const Restaurant = require('../../models').Restaurant;

router.get('/', function(req, res, next){
 Restaurant.findAll({})
    .then(function(restaurantArr){
      res.send(restaurantArr);
    })
});

module.exports = router;
