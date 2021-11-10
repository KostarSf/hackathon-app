var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  //res.render('index', { title: 'kostarsf.space' });
  res.redirect('itru/login');
});

router.post('/', (req, res) => {
  if (req.body.type === 'ping') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.send({ type: 'ping', success: true });
  }
});

module.exports = router;
