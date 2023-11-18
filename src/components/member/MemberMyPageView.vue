<script setup>
import MyPageNavBar from "./mypage/MyPageNavBar.vue";
</script>

<template>
  <div class="mypage-edgeline">
    <!-- 없어도 될 수도 있음 space -->
    <div class="mypage-top-space"></div>

    <div class="mypage-home-profile-container">
      <div class="mypage-home-profile"></div>
    </div>

    <div class="c">
      <div class="mypage-nav-bar">
        <MyPageNavBar />
      </div>

      <div class="바뀔녀석들">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c{
  width: 90%;
  border: 2px solid skyblue;
  height: 90%;
  border-radius: 20px;
}
.mypage-edgeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  height: 520px;
}

.mypage-top-space {
  height: 150px;
}

.mypage-home-profile-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  height: 260px;
  background-color: skyblue;
  border-radius: 50%;
}

.mypage-home-profile {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.mypage-nav-bar {
  width: 100%;
  display: inline-block;
}
</style>
