<script setup>
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();


// 반응형을 유지하면서 스토어에서 속성을 추출하려면, storeToRefs()를 사용
// https://pinia.vuejs.kr/core-concepts/
const { menuList } = storeToRefs(menuStore);
// const menuList = menuStore.menuList;
console.log(menuList)
const { changeMenuState } = menuStore;

const logout = () => {

  console.log("로그아웃!!!!");
  changeMenuState();
};



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
          <a href="/member/login" class="nav-link active">로그인</a>
          <a href="#" @click.prevent="logout" class="nav-link active">로그아웃</a>
          <a href="/member/join" class="nav-link active">회원가입</a>
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </div>
        <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px">
          <template v-for="menu in menuList" :key="menu.routeName">
            <template v-if="menu.show">
              <template v-if="menu.routeName === 'user-logout'">
                <li class="nav-item">
                  <router-link to="/" @click.prevent="logout" class="nav-link">{{
                    menu.name
                  }}</router-link>
                </li>
              </template>
              <template v-else>
                <li class="nav-item">
                  <router-link :to="{ name: menu.routeName }" class="nav-link">{{
                    menu.name
                  }}</router-link>
                </li>
              </template>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import "@/assets/sass/nav/nav.scss";
</style>
