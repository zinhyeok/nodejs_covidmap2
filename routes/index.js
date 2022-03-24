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
  console.log("upload");
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
module.exports = router;
