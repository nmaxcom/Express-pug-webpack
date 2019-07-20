const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { msg: 'index page' });
  next();
});

/* GET blog page. */
router.get('/blog', (req, res, next) => {
  res.render('index', { msg: 'blog!' });
  next();
});

module.exports = router;
