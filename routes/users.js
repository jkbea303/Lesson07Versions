var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
  /* GET signup fucntion that returns a three parameters which then renders the resource pages*/
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

module.exports = router;
