var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("start")
  res.render('index', { title: 'Express' });
});
/* GET upload page. */
router.get('/upload', (req, res, next) => {
  console.log("upload")
  res.render('upload', { title: 'Express' });
});

module.exports = router;
