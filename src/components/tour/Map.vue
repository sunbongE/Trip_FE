<script setup>
import { ref, onMounted } from "vue";
const map = ref(null);

const props = defineProps({
  dataList: Object,
});

// onMounted Hook을 사용하여 컴포넌트가 마운트된 후에 실행될 로직 작성
onMounted(() => {
  // Kakao 지도 API 로드
  kakao.maps.load(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    // Kakao 지도 객체 생성
    const newMap = new kakao.maps.Map(container, options);

    // 생성된 지도 객체를 상태(ref)에 저장
    map.value = newMap;

    document.querySelector("#map").innerHTML = "";
    var map = new kakao.maps.Map(container, options);
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "zoom_changed", function () {
      // 지도의 현재 레벨을 얻어옵니다
      var level = map.getLevel();
    });
    var positions = [];
    dataList.forEach(function (e) {
      let obj = {
        title: e.title,
        image: e.firstImage,
        addr1: e.addr1,
        latlng: new kakao.maps.LatLng(e.latitude, e.longitude),
      };
      positions.push(obj);
    });

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    positions.forEach((pos) => {
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: pos.latlng, // 마커의 위치
      });

      var overlay = new kakao.maps.CustomOverlay({
        map: map,
        yAnchor: 3,
        position: marker.getPosition(),
      });

      let content = document.createElement("div");
      content.className = "wrap";

      let info = document.createElement("div");
      info.className = "info";

      let title = document.createElement("div");
      title.className = "title";
      title.innerText = pos.title;
      let close = document.createElement("div");
      close.className = "close";
      close.addEventListener("click", () => overlay.setMap(null));

      info.appendChild(title);
      title.appendChild(close);

      let body = document.createElement("div");
      body.className = "body";
      info.appendChild(body);

      let imgDiv = document.createElement("div");
      imgDiv.className = "img";
      let img = document.createElement("img");
      img.src =
        pos.image || "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png";
      img.width = 73;
      img.height = 70;
      imgDiv.appendChild(img);

      let desc = document.createElement("div");
      desc.className = "desc";

      let ellipsis = document.createElement("div");
      ellipsis.className = "ellipsis";
      ellipsis.innerText = pos.addr1;
      let jibun = document.createElement("div");
      jibun.className = "jibun ellipsis";
      jibun.innerText = pos.addr1;
      let bottom = document.createElement("div");
      let link = document.createElement("a");
      link.target = "_blank";
      link.className = "link";
      link.innerText = "바로가기";
      bottom.appendChild(link);

      desc.appendChild(ellipsis);
      desc.appendChild(jibun);
      desc.appendChild(bottom);

      body.appendChild(imgDiv);
      body.appendChild(desc);

      content.appendChild(info);

      overlay.setContent(content);

      // $(document).on("click", "#close", function () {
      //  overlay.setMap(null);
      //});

      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
      });
    });

    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
    var bounds = new kakao.maps.LatLngBounds();

    for (i = 0; i < positions.length; i++) {
      // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다

      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(positions[i].latlng);
    }
    setBounds();
    function setBounds() {
      // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
      // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
      map.setBounds(bounds);
    }
  });
});
</script>
<template>
  <section>
    <!-- kakao map -->
    <div id="mapBox">
      <div id="map"></div>
    </div>
  </section>
</template>

<style scoped>
.box {
  margin-bottom: 70px;
}

#top-section {
  box-sizing: border-box;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 220px;
}

.ment {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: fadein 3s;
}

.ment h2 {
  font-size: 3em;
  font-weight: 600px;
}

#mapBox {
  margin-inline: auto;
  width: 100%;
  height: 600px;
  margin-bottom: 100px;
}
#map {
  width: 100%;
  height: 100%;
}

#youtubeBox {
  width: 100%;
  padding: 200px 0;
  background: #f9fbfc;
}

#youtubeBox p {
  margin-bottom: 10px;
  text-align: center;
  font-size: 3em;
  font-weight: 700;
}

#youtubeBox p:nth-child(2) {
  font-size: 1.4em;
  font-weight: 600px;
  color: #8b95a1;
}

#btnBox {
  /* display: none; */
  padding-top: 100px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
}

#btnBox button {
  color: #fff;
  font-weight: bold;
  width: 120px;
  height: 50px;
  border-radius: 10px;
  background: #772cf0;
  border: none;
  font-size: 1.2em;
}

#btnBox button:hover {
  cursor: pointer;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.selectBox option {
  padding: 10px;
  box-sizing: border-box;
  width: 25%;
  height: 40px;
  border-radius: 6px;
}
.selectBox {
  padding: 10px;
  box-sizing: border-box;
  width: 25%;
  height: 50px;
  border-radius: 6px;
  background-color: #f2f2f2;
  border: none;
  font-size: 1em;
}

#search-form {
  display: flex;
  margin-inline: auto;
  justify-content: space-evenly;
  margin-bottom: 30px;
  width: 80%;
  box-sizing: border-box;
}

#search-form input[type="button"] {
  box-sizing: border-box;
  width: 10%;
  padding: 10px;
  height: 50px;
  border-radius: 6px;
  border: none;
  background-color: #772cf0;
  color: #fff;
  font-size: 1em;
}

.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}

/* tablet */
@media screen and (max-width: 810px) {
  .ment h2 {
    font-size: 2.2em;
    font-weight: 600px;
  }
}
</style>
