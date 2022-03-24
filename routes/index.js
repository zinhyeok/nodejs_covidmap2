var express = require('express');
var router = express.Router();
const locationModel = require("../model/location");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("start")
  res.render('index', { title: 'Express' });
});
/* GET upload page. */
router.get('/upload', (req, res, next) => {
  res.render('upload');
});

router.post("/location", (req,res,next)=>{
  const {title, address, lat, lng} = req.body;
  let location = new locationModel();
  location.title = title;
  location.address = address;
  location.lat = lat;
  location.lng = lng;
  location.save().then(result => {
    console.log(result)
    res.json({
      message: "post success",
    });
  }).catch((error)=>{
    console.log(error);
    res.json({
      message: "post error",
    });
  });
});
//.find{} 안에 찾고 싶은 정보 입력
router.get('/location', (req, res, next) => {
  locationModel.find({}, { _id: 0, _v: 0 }).then((result) => {
    console.log(result);
    res.json({
      message: "success",
      data: result,
    });
  }).catch((error) => {
    res.json({
      message: "error",
    });
  });  
})


module.exports = router;
