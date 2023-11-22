<script setup>
import { ref, watch, onMounted } from "vue";
const emit = defineEmits(["selected", "searchKeyword"]);

var map;

const positions = ref([]);
const markers = ref([]);

// const props = defineProps({ stations: Array, selectStation: Object });
const props = defineProps({ stations: Array });


onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
      }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

watch(
  () => props.stations.value,
  () => {
    positions.value = [];
    props.stations.forEach((station) => {
      // console.log(station)

      let obj = {};
      obj.latlng = new kakao.maps.LatLng(station.latitude, station.longitude);
      obj.title = station.title;
      obj.contentId = station.contentId;
      obj.contentType = station.contentTypeId;
      obj.backImg = station.firstImage;
      obj.tel = station.tel;
      obj.addr = station.addr1 + station.addr2;
      obj.latitude = station.latitude;
      obj.longitude = station.longitude;

      positions.value.push(obj);
    });
    loadMarkers();
  },
  { deep: true }
);

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  // 지도 생성.
  map = new kakao.maps.Map(container, options);

  // loadMarkers();
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, "zoom_changed", function () {
    // 지도의 현재 레벨을 얻어옵니다
    var level = map.getLevel();
  });
  var positions = [];
};

const loadMarkers = () => {
  // 현재 표시되어있는 marker들이 있다면 map에 등록된 marker를 제거한다.
  deleteMarkers();

  // 마커 이미지를 생성합니다
  //   const imgSrc = require("@/assets/map/markerStar.png");
  // 마커 이미지의 이미지 크기 입니다
  //   const imgSize = new kakao.maps.Size(24, 35);
  //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

  // 마커를 생성합니다
  markers.value = [];
  positions.value.forEach((position) => {
    // console.log(position)
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true, // // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // contentId: position.contentId,
      // contentType: position.contentType,
      // backImg: position.firstImage,
      // tel: position.tel,

      // image: markerImage, // 마커의 이미지
    });


    var iwContent = `<div class="mks" style=" padding:20px; height:100%; width:300px;" value=${position.contentId} >
  <div>
    <img class="imgInfo" src=${position.backImg} style="max-width:150px; max-height: 300px; margin: 0 auto; display: flex;">
    <hr>
  </div>
  <p class="markP" style=" margin: 0;"  >${position.title}</p>
  <br>
  <div class="btnBox">
    <button style="height:50px;" id="youtubeButton" class="okBtn" data-no=${position.title.split(' ').join('')} >유튭슛</button>
    <div id="dataBox" data-addr="${position.addr}" data-latitude=${position.latitude} data-longitude="${position.longitude}" data-tel="${position.tel}" data-contentTypeId="${position.contentType}"></div>
    <button style="height:50px;" data-type=${position.contentType} data-no=${position.contentId} id="addButton" class="addBtn">추가슛</button>
  </div>
</div>`;

    var iwPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    var iwRemoveable = true;

    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
      removable: iwRemoveable
    });

    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    // 마커에 마우스오버 이벤트를 등록합니다
    // kakao.maps.event.addListener(marker, "mouseover", function () {
    //   //   // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
    //   infowindow.open(map, marker);
    // });

    // 마커에 마우스아웃 이벤트를 등록합니다
    // kakao.maps.event.addListener(marker, "mouseout", function () {
    //   // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    //   infowindow.close();
    // });
    // 마커 클릭시 이벤트
    kakao.maps.event.addListener(marker, 'click', function () {
      // infowindow.close();
      console.log("click Event")
      infowindow.open(map, marker);
      // 인포윈도우 창이 열리고 버튼들에게 이벤트 주입.
      var youtubeButtons = document.querySelectorAll('#youtubeButton');
      var addButtons = document.querySelectorAll('#addButton');
      youtubeButtons.forEach((youtubeButton) => {
        youtubeButton.addEventListener("click", youTubeFunc)
      })

      addButtons.forEach((addButton) => {
        addButton.addEventListener("click", addFunc)
      })


    });
    markers.value.push(marker);

    // youtubeButton.click();

    // Simulate a click event on the 'Add' button after a certain delay (for demonstration purposes)
    // setTimeout(function() {
    //   addButton.click();
    // }, 2000); // Adjust the delay time as needed
  });



  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  const bounds = positions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  );

  map.setBounds(bounds);
};

// 마커 삭제
const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};

function youTubeFunc() {

  let keyword = event.target.getAttribute("data-no");
  // console.log(event.target)
  console.log("유툽검색")
  console.log("가라랏:::++>" + keyword)
  emit("searchKeyword", keyword);
}
function addFunc() {
  let title = event.target.parentNode.parentNode.querySelector(".markP").innerText
  let contentId = event.target.getAttribute("data-no")
  let firstImage = event.target.parentNode.parentNode.querySelector(".imgInfo").src
  let tel = event.target.parentNode.parentNode.querySelector("#dataBox").getAttribute("data-tel")
  let contentTypeId = event.target.parentNode.parentNode.querySelector("#dataBox").getAttribute("data-contentTypeId")
  let latitude = event.target.parentNode.parentNode.querySelector("#dataBox").getAttribute("data-latitude")
  let longitude = event.target.parentNode.parentNode.querySelector("#dataBox").getAttribute("data-longitude")
  let addr = event.target.parentNode.parentNode.querySelector("#dataBox").getAttribute("data-addr")
  let info = {
    title: title,
    contentId: contentId,
    firstImage: firstImage,
    tel: tel,
    contentTypeId: contentTypeId,
    latitude: latitude,
    longitude: longitude,
    addr: addr,
    selected:false
  }
  emit("selected", info);

}
</script>

<template>
  <div id="map"></div>
</template>

<style>
@import '@/assets/sass/tour/Map.scss'
</style>
