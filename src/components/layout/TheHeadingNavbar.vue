<script setup>
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import {ref} from 'vue'
const menuStore = useMenuStore();

const logined = ref(false);
const userName = ref("");
const memberStore = useMemberStore();
const { userLogout } = memberStore;
// 반응형을 유지하면서 스토어에서 속성을 추출하려면, storeToRefs()를 사용
// https://pinia.vuejs.kr/core-concepts/
const { menuList } = storeToRefs(menuStore);
// const menuList = menuStore.menuList;
const { changeMenuState } = menuStore;

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
  }else {
    memberStore.isLogin = false;
    logined.value = false;
  }
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
        </div>
        <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px">
          <div class='statusBox' v-if='logined'>
            
            <a class="nav-link active" href="/member/mypage" >{{userName}}님 </a>
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
