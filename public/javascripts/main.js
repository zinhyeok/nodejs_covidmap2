var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
  };

var map = new naver.maps.Map("map", mapOptions);

const data = [
  {
    title: "용산역",
    address: "용산",
    lat:37.52995115069976, 
    lng:126.96479627575842,
  },

  {
    title: "서울역",
    address: "서울",
    lat:37.55619031742226, 
    lng: 126.9724214141688,
  }
]

let markerList = [];
let infowindowList = [];

const getClickHandler = (i) => () => {
  const marker = markerList[i];
  const inforwindow = infowindowList[i];
  if(inforwindow.getMap()){
    inforwindow.close();
  }
  else{
    inforwindow.open(map, marker);
  }
};

const getClicKMap = (i) => () => {
  const inforwindow = infowindowList[i];
  inforwindow.close();
}

for (let i in data){
  const target = data[i];
  const latlng = new naver.maps.LatLng(target.lat, target.lng);

  let marker = new naver.maps.Marker({
    map: map,
    position: latlng,
    icon: 
    {content : `<div class="marker"></div>`,
    acnhor: new naver.maps.Point(7.5,7.5),
    },
  });


  const content = `
  <div class="infowindow_wrap">
    <div class="infowindow_title">${target.title}</div>
    <div class="infowindow_address">${target.address}</div>
  </div>`;

  const infowindow = new naver.maps.InfoWindow({
    content: content,
    backgroundColor: "#00ff0000",
    borderColor: "#00ff0000",
    anchorSize: new naver.maps.Size(0,0)
});
    markerList.push(marker);
    infowindowList.push(infowindow);
}

for (let i=0, ii = markerList.length; i<ii; i++){
  naver.maps.Event.addListener(markerList[i],"click",getClickHandler(i));
  naver.maps.Event.addListener(map,"click",getClicKMap(i));
}