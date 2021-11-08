var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hackathon 2021: Dungeon Masters' });
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('got a post');
});

module.exports = router;
