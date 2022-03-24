const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
  };

const map = new naver.maps.Map("map", mapOptions);

$.ajax({
  url: "/location",
  type: "GET",
}).done((response) => {
  if (response.message !== "success") return;
  const data = response.data;

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

const cluster1 = {
  content: `<div class="cluster1"></div>`,
}

const cluster2 = {
  content: `<div class="cluster2"></div>`
}

const cluster3 = {
  content: `<div class="cluster3"></div>`
}

const markerClustering = new MarkerClustering({
  minClusterSize: 2,
  maxZoom: 12,
  map: map,
  markers: markerList,
  disableClickZoom: false,
  gridSize: 20,
  icons: [cluster1, cluster2, cluster3],
  indexGenerator: [2, 5, 10],   //cluster가 실행되는 마커 개수 범위 설정
  stylingFunction: (clusterMarker, count) => {
      $(clusterMarker.getElement()).find("div:first-child").text(count);
  }
  //클러스터 안에 몇개의 마커가 들어있는지 표시해줌.
});
});




