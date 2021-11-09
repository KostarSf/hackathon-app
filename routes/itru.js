var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('itru/index', { title: 'ITRU - Главная' });
});

router.get('/login', function (req, res, next) {
  res.render('itru/login', { title: 'ITRU - Вход' });
});

router.post('/login', (req, res) => {
  var response = {
    status: String,
    message: String
  };

  // response.status = "denied";
  // response.message = "error";

  response.status = "passed";
  response.message = "success";

  res.json(response);
});

module.exports = router;
