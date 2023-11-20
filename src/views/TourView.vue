<script setup>
import { ref, onMounted } from "vue";
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
  dataList.value = [];
  getSearchTourinfo(
    selectedSido.value,
    selectedGugun.value,
    selectedContentType.value,
    ({ data }) => {
      // console.log(data);
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
</script>

<template>
  <section id="top-section">
    <!-- ment -->
    <div class="ment box">
      <h2>여행 가고 싶은 지역을</h2>
      <h2>검색해보세요.</h2>
    </div>

    <form id="search-form">
      <!-- <select name="search-area" id="search-area" class="selectBox">
                                                    <option value="">지역</option>
                                                    <c:forEach var="item" items="${sidoList}">
                                                        <option value="${item.sidoCode}">${item.sidoName}</option>
                                                    </c:forEach>
                                                </select> -->
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
        <div id="mapList"></div>
        <KMap @selected="addList" :stations="dataList"></KMap>
      </div>
      <div id="YoutubeFrame">
        <YouTube></YouTube>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import '@/assets/sass/tour/tourView.scss'
</style>
