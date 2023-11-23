<script setup>
import { useMemberStore } from "@/stores/member";
import { ref, onMounted, computed } from 'vue'
import { getAlarm, readAlarm, deleteAlarm } from "@/api/alarm.js"

const alarmList = ref([])
const alarmCnt = computed(() => {
  return alarmList.value.filter(alarm => !alarm.read).length;
});
const logined = ref(false);
const userName = ref("");
const memberStore = useMemberStore();
const { userLogout } = memberStore;
// 반응형을 유지하면서 스토어에서 속성을 추출하려면, storeToRefs()를 사용
// https://pinia.vuejs.kr/core-concepts/
// const menuList = menuStore.menuList;
const alarmMsg = {
  101: "동행수락",
  102: "동행거부",
  103: "동행요청",
  201: "친구수락",
  202: "친구거부",
  203: "친구요청",
  204: "친구차단"
}
const getAlarmFunc = () => {
  if (sessionStorage.getItem("memberStore") !== null && JSON.parse(sessionStorage.getItem("memberStore")).isLogin === true) {
    const userId = memberStore.userInfo.userId;
    getAlarm(
      userId,
      ({ data }) => {
        alarmList.value = data;
        console.log(alarmList.value)
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
// console.log(alarmMsg[101])
onMounted(() => {
  getAlarmFunc()
})

const alarmToggle = ref(false);

const logout = () => {
  const member = JSON.parse(sessionStorage.getItem("memberStore"));
  // console.log(member.isLogin)
  if (member.isLogin) { // 로그인 되있는 상태
    const userId = member.userInfo.userId
    logined.value = false;
    userLogout(userId)

  } else {
    alert("이미 로그아웃 상태입니다.")
  }
  // changeMenuState();
};
// 세션 스토리지에 memberStore가 없으면 로그인 안한 상태니까
// if(세션.get(memberStore)==null || )
// console.log(JSON.parse(sessionStorage.getItem("memberStore")).isLogin)


if (sessionStorage.getItem("memberStore") != null) {
  const member = JSON.parse(sessionStorage.getItem("memberStore"));
  if (member.isLogin && member.userInfo != null) {
    // console.log(member.isLogin)
    logined.value = true;
    userName.value = member.userInfo.userName;
  } else {
    memberStore.isLogin = false;
    logined.value = false;
  }
}

// 알람 읽음 처리.
const readFunc = (id) => {
  readAlarm(id,
    (Response) => {
      // console.log(Response)
      if (Response.status !== 200) {
        alert("이미 삭제되었습니다.")
      }
      getAlarmFunc()
    },
    (error) => {
      console.log(error)
    })
}
const delFunc = () => {
  const member = JSON.parse(sessionStorage.getItem("memberStore"));
  const userId = member.userInfo.userId;
  deleteAlarm(userId,
    (Response) => {
      getAlarmFunc()
    })
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- <router-link :to="{ name: 'home' }" class="navbar-brand">BAROGA</router-link> -->
      <a id="homeBtn" class="navbar-brand" href="/">BAROGA</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a href="/board" class="nav-link active">게시판</a>
          <a href="/qna" class="nav-link active">QnA</a>
          <a href="/tour/plan" class="nav-link active">여행지검색</a>
          <a href="/club" class="nav-link active">동행</a>
        </div>
        <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px">
          <div class='statusBox' v-if='logined'>
            <div id='alarmFrame'>
              <div id="alarmBox" v-show='alarmToggle'>
                <div id="delT"><a href="#" @click.prevent="delFunc">전부 삭제</a></div>
                <div class="alarm" v-for='al in alarmList' :key='al.id' @click="al.read === false ? readFunc(al.id) : ''">
                  <div data-id='al' :value='al'></div>
                  <p>{{ al.fromUserId }}님이 {{ alarmMsg[al.type] }}을 하였습니다
                  <div v-if='!al.read' class='status'> </div>
                  </p>
                </div>
              </div>
              <div id='alarmCnt'><span>{{ alarmCnt }}</span></div>
              <svg @click='alarmToggle = !alarmToggle' id='alarmI' xmlns="http://www.w3.org/2000/svg" width="24"
                height="24px" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                <path
                  d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
              </svg>
            </div>
            <a class="nav-link active" href="/member/mypage">{{ userName }}님 </a>
            <a href="#" @click.prevent="logout" class="nav-link active">로그아웃</a>
          </div>
          <div class='statusBox' v-else>
            <a href="/member/login" class="nav-link active">로그인</a>
            <a href="/member/join" class="nav-link active">회원가입</a>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import "@/assets/sass/nav/nav.scss";
</style>
