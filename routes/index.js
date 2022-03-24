var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("start")
  res.render('index', { title: 'Express' });
});
/* GET upload page. */
router.get('/upload', (req, res, next) => {
  console.log("upload");
});

router.get("/test", (req,res,next)=>{
  console.log("test 완료");
  res.json({
    message: "resonse 완료",
  });
});

router.post("/test", (req,res,next)=>{
  const {test, test2} = req.body;
  console.log(test);
  console.log(test2);
  res.json({
    message: "post response 완료",
  });
});
module.exports = router;
