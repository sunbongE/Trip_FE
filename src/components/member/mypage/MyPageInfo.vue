<script setup>
import { onMounted } from "vue";
import { useMemberStore } from "@/stores/member";
import { useRouter, useRoute } from "vue-router";

const memberStore = useMemberStore();

const router = useRouter();
// onMounted(async () => {
//   const accessToken = sessionStorage.getItem("accessToken");

//   if (accessToken && !memberStore.isLogin) {
//     try {
//       await memberStore.getUserInfo(accessToken);
//     } catch (error) {
//       console.error("Failed to fetch user information", error);
//     }
//   }
// });
// 비밀번호 확인 form
function callUpdateInfo() {
  router.push({ name: "mypage-pwdcheck" });
}
</script>
<template>
  <div class="mypage-info">
    <h1>MY INFO</h1>
    <div v-if="memberStore.isLogin" class="mypage-info-container">
      <div class="mypage-info-row">
        <p class="mypage-info-label">ID :</p>
        <p class="mypage-info-value">{{ memberStore.userInfo.userId }}</p>
      </div>

      <div class="mypage-info-row">
        <p class="mypage-info-label">Name :</p>
        <p class="mypage-info-value">{{ memberStore.userInfo.userName }}</p>
      </div>

      <div class="mypage-info-row">
        <p class="mypage-info-label">Email :</p>
        <p class="mypage-info-value">
          {{ memberStore.userInfo.emailId }}@{{ memberStore.userInfo.emailDomain }}
        </p>
      </div>
      <div>
        <button @click="callUpdateInfo" class="okBtn">회원 정보 수정</button>
      </div>
    </div>
    <div v-else>
      <p>로그인 화면으로 슛</p>
    </div>
  </div>
</template>

<style scoped>
.mypage-info {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
}

.mypage-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f0f8ff;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  width: 80%;
}

.mypage-info-row {
  display: flex;
  width: 100%;
  justify-content: start;
  margin-bottom: 10px;
}

.mypage-info-label {
  text-align: center;
  color: #87ceeb;
}

.mypage-info-value {
  margin-left: 0.5em;
  color: blue;
  /* 흰색 글자색 */
}
</style>
