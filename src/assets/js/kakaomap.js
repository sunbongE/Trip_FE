export const showMarks = () => {
  // 기존에 표시된 맵을 지우도 다시 만든다.
  document.querySelector("#map").innerHTML = "";
  var map = new kakao.maps.Map(mapContainer, mapOption);
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
    img.src = pos.image || "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png";
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
};

//=============kakaomap==================
// KAKAO MAP API
kakao.maps.load(() => {
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, "zoom_changed", function () {
    // 지도의 현재 레벨을 얻어옵니다
    var level = map.getLevel();
  });
});
