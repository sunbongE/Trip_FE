<script setup>
import { onMounted, ref } from "vue";
import { useMemberStore } from "@/stores/member";
import { searchMyClubs, searchByToUserId, searchByFromUserId } from "@/api/club";

const memberStore = useMemberStore();

const myClubs = ref([]);

const toMeList = ref([]);

const fromMeList = ref([]);

onMounted(async () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken && !memberStore.isLogin) {
    try {
      await memberStore.getUserInfo(accessToken);
    } catch (error) {
      console.error("Failed to fetch user information", error);
    }
  }

  searchMyClubs(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log(data);
      myClubs.value = data;
    },
    (error) => console.log(error)
  );

  searchByToUserId(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log(data);
      toMeList.value = data;
    },
    (error) => console.log(error)
  );

  searchByFromUserId(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log(data);
      fromMeList.value = data;
    },
    (error) => console.log(error)
  );
});
</script>

<template>
  <div class="mypage-club">
    <h1>MY CLUB</h1>
    <h3>내 클럽 목록</h3>
    <div v-for="mc in myClubs" :key="mc.id">
      <p>subject : {{ mc.subject }}</p>
      <p>content : {{ mc.content }}</p>
      <p>현재 상태 : {{ mc.status === 1 ? "모집중" : "모집완료" }}</p>
      <p>인원 : {{ mc.people }}/{{ mc.totalCnt }}</p>
      <button class="okBtn">상세보기</button>
    </div>

    <h3>나에게 온 요청</h3>
    <div v-for="tm in toMeList" :key="tm.id">
      <p>FROM : {{ tm.fromUserId }}</p>
      <p>TO : {{ tm.toUserId }}</p>
      <button class="okBtn">수락</button><button>거절</button>
    </div>
    <h3>내가 보낸 요청</h3>
    <div v-for="fm in fromMeList" :key="fm.id">
      <p>User ID: {{ fm.toUserId }}</p>
      <p>Description: {{ fm.fromUserId }}</p>
    </div>
  </div>
</template>

<style scoped>
.mypage-club {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
}
</style>
