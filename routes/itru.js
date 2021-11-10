var express = require('express');
var router = express.Router();

var Database = require('../libs/db');
var database = new Database();

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

  database.fetch_login(req.body.email, req.body.password, (error) => {
    if (error === null) {
      response.status = "passed";
      response.message = "Вход выполнен";
    } else {
      response.status = "denied";
      response.message = error.message;

      switch (error.message) {
        case "wrong_password":
          response.message = "Неверный пароль";
          break;
        case "registration_needed":
          response.message = "Вам необходимо зарегистрироваться, чтобы продолжить";
          break;
        case "restricted_email":
          response.message = "Недопустимая электронная почта";
          break;
        default:
          response.message = `UNDEFINED_MESSAGE: ${error.message}`;
      }
    }

    res.json(response);
  });
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

router.post('/register', (req, res) => {
  var response = {
    status: String,
    message: String
  };

  database.fetch_register(req.body.email, req.body.key, (error) => {
    if (error == null) {
      database.register_user({
        email: req.body.email,
        hash: req.body.password
      }, (err) => {
        if (err == null) {
          response.status = "passed";
          response.message = "Регистрация выполнена";
        } else {
          response.status = "denied";
          response.message = err;
        }

        res.json(response);
      });
    } else {
      response.status = "denied";
      response.message = error.message;

      switch (error.message) {
        case "already_registered":
          response.message = "Данная электронная почта уже используется";
          break;
        case "wrong_key":
          response.message = "Неверный ключ регистрации";
          break;
        case "blank_key":
          response.message = "Для данной электронной почты необходим ключ регистрации";
          break;
        case "restricted_email":
          response.message = "Недопустимая электронная почта";
          break;
        default:
          response.message = `UNDEFINED_STATUS: ${error.message}`;
      }

      res.json(response);
    }
  });
});

module.exports = router;
