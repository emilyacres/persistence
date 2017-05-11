var router = require('express').Router();
var Hotel = require('../../models').Hotel;

router.get('/', function(req, res){
  Hotel.findAll({})
    .then(function(hotelArr){
      res.send(hotelArr);
    })
});

module.exports = router;
