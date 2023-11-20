<script setup>
import MyPageNavBar from "./mypage/MyPageNavBar.vue";
</script>

<template>
  <div class="mypage-edgeline">
    <div class="mypage-home-profile-parent">
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
.c {
  width: 70%;
  border: 2px solid skyblue;
  /* height: 90%; */
  border-radius: 20px;
  transform: translateY(-130px);
}
.mypage-edgeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  height: 90%;
}

.mypage-home-profile-parent {
  margin-top: 100px;
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

@media screen and (max-width: 768px) {
  .c {
  width: 70%;
  border: 2px solid skyblue;
  /* height: 90%; */
  border-radius: 20px;
  transform: translateY(-60px);
  }

  .mypage-home-profile-parent {
  margin-top:20px;
  width: 150px;
  height: 150px;
  background-color: skyblue;
  border-radius: 50%;
}

  .mypage-home-profile {
    border-radius: 50%;
  }
}
</style>
