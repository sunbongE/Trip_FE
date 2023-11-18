<script setup>
import { onMounted } from 'vue';
import { useMemberStore } from '@/stores/member';

const memberStore = useMemberStore();

onMounted(async () => {
  // 세션 스토리지에서 accessToken 가져오기
  const accessToken = sessionStorage.getItem('accessToken');

  if (accessToken && !memberStore.isLogin) {
    try {
      // 사용자 정보 가져오기
      await memberStore.getUserInfo(accessToken);
    } catch (error) {
      console.error('Failed to fetch user information', error);
    }
  }
});
</script>

<template>
  <div class="mypage-info">
    <h1>MY INFO</h1>
    <div v-if="memberStore.isLogin">
      <p>User ID: {{ memberStore.userInfo.userid }}</p>
      <p>User Name: {{ memberStore.userInfo.username }}</p>
      <p>Email: {{ memberStore.userInfo.email }}</p>
      <!-- 기타 사용자 정보 표시 -->
    </div>
    <div v-else>
      <p>Please log in to view your information.</p>
    </div>
  </div>
</template>

<style scoped>
/* 스타일링 추가 */
</style>
