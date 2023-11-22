<script setup>
import { onMounted, ref } from "vue";
import { useMemberStore } from "@/stores/member";
import { searchPlanByUserId } from "@/api/plan";

const memberStore = useMemberStore();

const planList = ref([]);

onMounted(async () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken && !memberStore.isLogin) {
    try {
      await memberStore.getUserInfo(accessToken);
    } catch (error) {
      console.error("Failed to fetch user information", error);
    }
  }

  searchPlanByUserId(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log(data)
      planList.value = data;
    },
    (error) => console.log(error) 
  )
});
</script>

<template>
  <div class="mypage-club">
    <h1>MY PLAN</h1>
    <div id="cardFrame">
      <div class="planCard" v-for="item in planList" :key="item.id">
        <h3>여행: {{ item.subject }} </h3>
        <p>설명: {{ item.description }}</p>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/sass/member/myPagePlan.scss"
</style>
