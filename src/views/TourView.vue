<script setup>
import { ref, onMounted, watch } from "vue";
import { getSidoList, getGugunList, getSearchTourinfo } from "@/api/tour";

import KMap from "../components/tour/Map.vue";
import YouTube from "../components/tour/YouTube.vue";

const sidoLists = ref([]);
const gugunLists = ref([]);

const selectedSido = ref("");
const selectedGugun = ref("");
const selectedContentType = ref("");


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
    infoBtnBox.style="display:flex;"
    var infoBtn = document.createElement("button");
    infoBtn.innerText = "추가"
    infoBtn.value = data.contentId
    infoBtn.className = "addBtn"
    infoBtn.style = "width:150px; height:30px; padding:none !important; margin: 0 auto;"
    infoBtn.addEventListener("click",(e)=>{console.log(e.target)})
    
    infoBtnBox.appendChild(infoBtn)
    infohead.appendChild(infotitle);
    infoframe.appendChild(infohead);
    infoframe.appendChild(infoaddr);
    infoframe.appendChild(infotel);
    infoframe.appendChild(infoBtnBox);
    // console.log(document.body.getElementsByClassName("#mapList"))
    // document.body.appendChild(infoframe)
    mapList.appendChild(infoframe);
  })

  console.log("watch실행중")
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
const addList = (data) => {
  console.log(data)
}
const word = ref("");
// 키워드 검색
const searchFunc = (keyword) => {
  // console.log(keyword)
  word.value = keyword;
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
      <div id="YoutubeFrame">
        <YouTube :keyword='word'></YouTube>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import '@/assets/sass/tour/tourView.scss'
</style>
