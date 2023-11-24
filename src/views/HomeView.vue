<script setup>
import { onMounted, ref } from "vue";
import { getSearchByPoint } from "@/api/tour";
import { useRouter } from 'vue-router';
import { useRecoStore } from "@/stores/reco";
const router = useRouter();
const recoStore = useRecoStore();
// import { onBeforeRouteLeave } from 'vue-router';

// onBeforeRouteLeave(() => {
//     const sc1 = document.querySelector('script[src="https://code.jquery.com/jquery-3.7.1.min.js"]');
//     const sc2 = document.querySelector('script[src="src/fullpage/jquery.fullPage.js"]');
//     const sc3 = document.querySelector('script[src="src/fullpage/main.js"]');

//     if (sc1) {
//         document.head.removeChild(sc1);
//     }
//     if (sc2) {
//         document.head.removeChild(sc2);
//     }
//     if (sc3) {
//         document.head.removeChild(sc3);
//     }

// })
const latitude = ref();
const longitude = ref();
const searchKeyword = ref("");
onMounted(() => {
  const sc1 = document.createElement("script");
  sc1.src = "https://code.jquery.com/jquery-3.7.1.min.js";
  sc1.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
  sc1.crossOrigin = "anonymous";
  sc1.defer = true;

  const sc2 = document.createElement("script");
  sc2.src = "src/fullpage/jquery.fullPage.js";
  sc2.defer = true;

  const sc3 = document.createElement("script");
  sc3.src = "src/fullpage/main.js";
  sc3.defer = true;

  sc1.onload = () => {
    document.head.appendChild(sc2);
    sc2.onload = () => {
      document.head.appendChild(sc3);
    };
  };

  document.head.appendChild(sc1);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    latitude.value = crd.latitude;
    longitude.value = crd.longitude;
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    console.log(longitude.value);
    console.log(latitude.value);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
});

function callGetSearchByPoint() {
  getSearchByPoint(
    {
      title: searchKeyword.value,
      latitude: latitude.value,
      longitude: longitude.value,
    },
    ({ data }) => {
      console.log("검색결과 data : ", data);
      // 어딘가로 이동
      recoStore.searchLists = data;
      router.push("reco")
      // location.href = "/reco"
    },
    (error) => console.log(error)
  );
}
const moveClub = () => {
  location.href = "/club/list"
}
const moveTourPlan = () => {
  location.href = "/tour/plan"
}
</script>
<template>
  <main id="fullpage">
    <section id="sec1" class="section">
      <div id="frame">
        <div id="base">
          <div id="textbox">
            <div>
              <span>나는 지금 &nbsp</span>
              <input type="text" id="search" v-model="searchKeyword" @keyup.enter="callGetSearchByPoint"
                autocomplete="off" />
            </div>
            <div>
              <span>가고 싶다.</span>
            </div>
          </div>
      </div>
      </div>
    </section>
    <section id="sec2" class="section">
      <div id="sec2Box">
        <div id="sec2Frame">
          <div id="ment1">
            <h1>함께하는 여행, 더 특별한 경험! </h1>
          </div>
          <div id="ment2">
            <h1>동행을 모집합니다.</h1>
          </div>
          <div id="sec2BtnBox">
            <button class="okBtn" @click="moveClub">바로가기</button>
          </div>
        </div>
      </div>

    </section>
    <section id="sec3" class="section">
      <div id="sec2Box">
        <div id="sec2Frame">
          <div id="ment1">
            <h1>유튜브로 여행지를 찾아가세요, </h1>
          </div>
          <div id="ment2">
            <h1>새로운 경험이 여기 있습니다.</h1>
          </div>
          <div id="sec2BtnBox"><button class="okBtn" @click="moveTourPlan">바로가기</button></div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped>
#sec1 {
  background: no-repeat url("../assets/images/background/section1.jpg");
  background-size: cover;
}

#sec2 {
  background: no-repeat url("../assets/images/background/section2.jpg");
  background-size: cover;
}

#sec3 {
  background: no-repeat url("../assets/images/background/backimg1.png");
  background-size: cover;
}

#sec4 {
  background: no-repeat url("../assets/images/background/backimg2.png");
  background-size: cover;
}

#frame {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

input:focus {
  outline: none;
}

input {
  font-weight: bold;
}

#search {
  width: 40%;
  font-size: 60px;
  border-width: 0 0 5px;
  background: transparent;
}

#fp-nav>ul>li>a>span {
  background: #51abf3 !important;
}

#textbox>div>span {
  font-size: 4em;
  font-weight: bold;
}

#textbox>div:first-child {
  display: flex;
}

#base {
  display: grid;
  justify-items: center;
  /* grid-template-columns: 3fr 1fr; */
  margin: 0 2em;
}

#textbox>div {
  text-align: end;
}

#sec2Frame {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-gap: 4em;
}


#sec2Box {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#sec2BtnBox {
  width: 100%;
  display: flex;
  justify-content: flex-end
}

#sec2BtnBox>button {
  color: #fff !important;
  padding: 10px 20px;

}

#ment1>h1,
#ment2>h1 {
  font-size: 4em;
  font-weight: bold;
}
</style>
