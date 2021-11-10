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

  var email = req.body.email;
  var passw = req.body.password;

  if (email === "test@mail.ru" && passw === "1234") {
    response.status = "passed";
    response.message = "success";
  } else {
    response.status = "denied";
    response.message = "error";
  }

  res.json(response);
});

router.get('/current_day', (req, res) => {
  res.render('itru/current_day', { title: 'ITRU - Текущие занятия' });
});

router.get('/recover', (req, res) => {
  res.render('itru/recover', { title: 'ITRU - Восстановление пароля' });
});

router.get('/register', (req, res) => {
  res.render('itru/register', { title: 'ITRU - Регистрация' });
});

module.exports = router;
