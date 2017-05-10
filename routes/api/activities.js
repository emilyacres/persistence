var router = require('express').Router();
const Activity = require('../../models').Activity;

router.get('/', function(req, res, next){
 Activity.findAll({})
    .then(function(activityArr){
      res.send(activityArr);
    })
});

module.exports = router;
