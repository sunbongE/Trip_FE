<script setup>
import { ref, onMounted } from "vue";
import { getSidoList, getGugunList, getSearchTourinfo } from "@/api/tour";

import KMap from "../components/tour/Map.vue";
import YouTube from "../components/tour/YouTube.vue";

const sidoLists = ref([]);
const gugunLists = ref([]);

const selectedSido = ref("");
const selectedGugun = ref("");
const selectedContentId = ref("");

const dataList = ref([]);
// 1. 페이지 로드 시 -> get /trip/sidoList
onMounted(() => {
  loadSidos();
});

const loadSidos = () => {
  getSidoList(
    ({ data }) => {
      console.log(data);
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
      console.log(data);
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
    selectedContentId.value,
    ({ data }) => {
      console.log(data);
      dataList.value = data;
    },
    (error) => console.log(error)
  );
}
// 2. sidoList 로 채워진 부분이 change 되면 -> 그에 따란 gugunList/{} get
// 3. 이후 selectedContentId 까지
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

      <select v-model="selectedContentId" class="selectBox">
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
      <button @click.prevent="callSearchTourInfo">검색</button>
    </form>
    <div>
      <div id="MapFrame">
        <KMap :stations="dataList"></KMap>
      </div>
      <div id="YoutubeFrame">
        <YouTube></YouTube>
      </div>
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
