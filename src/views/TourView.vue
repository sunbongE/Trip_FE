<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { getSidoList, getGugunList, getSearchTourinfo } from "@/api/tour";
import { useTourPlanStore } from "@/stores/tourPlan"
import { storeToRefs } from "pinia";
// import {planListCnt, planList} from useTourPlanStore();

import KMap from "../components/tour/Map.vue";
import YouTube from "../components/tour/YouTube.vue";

const tourPlanStore = useTourPlanStore();
const { planListCnt, planList } = storeToRefs(tourPlanStore);

const sidoLists = ref([]);
const gugunLists = ref([]);

const selectedSido = ref("");
const selectedGugun = ref("");
const selectedContentType = ref("");

// plan 관련 변수
const planTogle = ref(false);
// const planListCnt = ref(0);
// const planList = ref([])
// 맵에서 발생한 이벤트
const addList = (data) => {
  // console.log("오니")
  const index = planList.value.findIndex((info) => {
    return info.contentId === data.contentId;
  });

  if (index === -1) {
    planList.value.push(data); // Add if contentId doesn't exist
  } else {
    planList.value.splice(index, 1); // Remove if contentId exists
  }
}


// 왼쪽 리스트에서 발생한 이벤트 
// addList와 같은 형태로 data를 맞춰서 넘겨준다.
const makeData = () => {
  let title = event.target.parentNode.parentNode.querySelector(".infotitle").innerText
  let contentId = event.target.value
  let firstImage = event.target.parentNode.parentNode.querySelector(".firstImage").value
  let tel = event.target.parentNode.parentNode.querySelector(".infotel").innerText
  let contentTypeId = event.target.parentNode.parentNode.querySelector(".contentTypeId").value
  let latitude = event.target.parentNode.parentNode.querySelector(".latitude").value
  let longitude = event.target.parentNode.parentNode.querySelector(".longitude").value
  let addr = event.target.parentNode.parentNode.querySelector(".infoaddr").innerText
  let info = {
    title: title,
    contentId: contentId,
    firstImage: firstImage,
    tel: tel,
    contentTypeId: contentTypeId,
    latitude: latitude,
    longitude: longitude,
    addr: addr
  }
  // 생성한 정보로 리스트 추가 함수 호출
  addList(info);
}


const dataList = ref([]);
// 1. 페이지 로드 시 -> get /trip/sidoList
onMounted(() => {
  loadSidos();
});



watch(dataList, () => {
  var mapList = document.querySelector("#mapList");
  while (mapList.firstChild) {
    mapList.removeChild(mapList.firstChild);
  }

  // dataList 순회하면서 객체 만들어 바디에 붙여줌
  dataList.value.forEach((data) => {

    var infoframe = document.createElement("div");
    infoframe.className = "infoname";
    infoframe.style = " border: 1px solid black; padding:10px"
    var infohead = document.createElement("div");
    infohead.className = "infohead";

    var infotitle = document.createElement("p");
    infotitle.className = "infotitle";
    infotitle.innerText = data.title;

    var infoaddr = document.createElement("p");
    infoaddr.className = "infoaddr";
    infoaddr.innerText = data.addr1 + data.addr2

    var infotel = document.createElement("p");
    infotel.className = "infotel";
    infotel.innerText = data.tel;

    var infoBtnBox = document.createElement("div");
    infoBtnBox.style = "display:flex;"
    var infoBtn = document.createElement("button");
    infoBtn.innerText = "추가"
    infoBtn.value = data.contentId
    infoBtn.className = "addBtn"
    infoBtn.style = "width:150px; height:30px; padding:none !important; margin: 0 auto;"
    infoBtn.addEventListener("click", makeData)

    var infoContentTypeId = document.createElement("input");
    infoContentTypeId.type = "hidden"
    infoContentTypeId.className = "contentTypeId"
    infoContentTypeId.value = data.contentTypeId

    var infoFirstImage = document.createElement("input");
    infoFirstImage.type = "hidden"
    infoFirstImage.className = "firstImage"
    infoFirstImage.value = data.firstImage

    var infoLatitude = document.createElement("input");
    infoLatitude.type = "hidden"
    infoLatitude.className = "latitude"
    infoLatitude.value = data.latitude

    var infoLongitude = document.createElement("input");
    infoLongitude.type = "hidden"
    infoLongitude.className = "longitude"
    infoLongitude.value = data.longitude

    infoBtnBox.appendChild(infoBtn)
    infohead.appendChild(infotitle);
    infoframe.appendChild(infohead);
    infoframe.appendChild(infoaddr);
    infoframe.appendChild(infotel);
    infoframe.appendChild(infoBtnBox);
    infoframe.appendChild(infoContentTypeId);
    infoframe.appendChild(infoFirstImage);
    infoframe.appendChild(infoLatitude);
    infoframe.appendChild(infoLongitude);

    mapList.appendChild(infoframe);
  })

  // console.log("watch실행중")
})

const loadSidos = () => {
  getSidoList(
    ({ data }) => {
      // console.log(data);
      sidoLists.value = data;
    },
    (error) => console.log(error)
  );
};

// sido 변경 시 호출
function loadGuguns() {
  gugunLists.value = [];
  getGugunList(
    selectedSido.value,
    ({ data }) => {
      // console.log(data);
      gugunLists.value = data;
    },
    (error) => console.log(error)
  );
}

function callSearchTourInfo() {
  if (selectedSido.value === '') {
    alert("지역을 선택해주세요!")
    return
  } else if (selectedGugun.value === '') {
    alert("시군구를 선택해주세요!")
    return
  } else if (selectedContentType.value === '') {
    alert("관광지 유형을 선택해주세요!")
    return;
  }
  getSearchTourinfo(
    selectedSido.value,
    selectedGugun.value,
    selectedContentType.value,
    ({ data }) => {
      // console.log(data)
      if (data.length === 0) {
        alert("다른데 검색하세요")
        return
      }
      dataList.value = [];
      // console.log("오나?")
      dataList.value = data;

    },
    (error) => console.log(error)
  );
}
// 2. sidoList 로 채워진 부분이 change 되면 -> 그에 따란 gugunList/{} get
// 3. 이후 selectedContentType 까지

// 유튜브 키워드
const word = ref("");
// 키워드 검색
const searchFunc = (keyword) => {
  // console.log(keyword)
  word.value = keyword;
}
// 여행지 목록 영역 클릭시 토글 효과
const planTogleFunc = () => {
  planTogle.value = !planTogle.value;
}
</script>
<template>
  <section id="top-section">
    <!-- ment -->
    <div class="ment box">
      <h2>여행 가고 싶은 지역을</h2>
      <h2>검색해보세요.</h2>
    </div>

    <form id="search-form">
      <div id="planBox">
        <img id="planImg" src="@/assets/images/plan/plan.png" @click="planTogleFunc">
        <div id="planCnt"><span>{{ planListCnt }}</span></div>
        <div id="showPlan" v-show="planTogle">
          <div id="showPlanFrame">
            <div id="noticePlan">
              <h2>여행지 목록</h2> <a id="movePlan" href="#">계획하기👉</a>
            </div>
            <div id="myList">
              <template v-for="planInfo in planList" :key="planInfo.contentId">
                <div id="myListFrame">
                  <div class="Images"><img :src="planInfo.firstImage" alt="" srcset=""></div>
                  <div class="info">
                    <div class="infoTitle"><span>여행지 : {{ planInfo.title }}</span></div>
                    <div>
                      <p>주소: {{ planInfo.addr }}</p>
                      <p>전화번호: {{ planInfo.tel }}</p>
                    </div>
                  </div>
                </div>
                <hr>
              </template>
            </div>
          </div>
        </div>
      </div>
      <select v-model="selectedSido" @change="loadGuguns" class="selectBox">
        <option value="">지역</option>
        <option v-for="item in sidoLists" :key="item.sidoCode" :value="item.sidoCode">
          {{ item.sidoName }}
        </option>
      </select>
      <select v-model="selectedGugun" class="selectBox">
        <option value="">시군구</option>
        <option v-for="gugun in gugunLists" :key="gugun.gugunCode" :value="gugun.gugunCode">
          {{ gugun.gugunName }}
        </option>
      </select>

      <select v-model="selectedContentType" class="selectBox">
        <option value="">관광지 유형</option>
        <option value="12">관광지</option>
        <option value="14">문화시설</option>
        <option value="15">축제공연행사</option>
        <option value="25">여행코스</option>
        <option value="28">레포츠</option>
        <option value="32">숙박</option>
        <option value="38">쇼핑</option>
        <option value="39">음식점</option>
      </select>
      <button class="okBtn" @click.prevent="callSearchTourInfo">검색</button>
    </form>
    <div>
      <div id="MapFrame">
        <div id="mapList" class='mapList'></div>
        <KMap @selected="addList" @search-keyword="searchFunc" :stations="dataList"></KMap>
      </div>
      <div id="YoutubeFrame" ref="youtube">
        <YouTube :keyword='word'></YouTube>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import '@/assets/sass/tour/tourView.scss'
</style>
