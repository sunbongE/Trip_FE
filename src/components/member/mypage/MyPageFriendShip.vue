<script setup>
import { onMounted, ref } from "vue";
import { useMemberStore } from "@/stores/member";
import { searchByStatus, getReceived, answer } from "@/api/friendship";

const memberStore = useMemberStore();
const req = ref({
  userId: "",
  status: 201,
});
const friends = ref([]);
const receivedList = ref([]);

onMounted(async () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken && !memberStore.isLogin) {
    try {
      await memberStore.getUserInfo(accessToken);
    } catch (error) {
      console.error("Failed to fetch user information", error);
    }
  }

  req.value.userId = memberStore.userInfo.userId;
  console.log("req 값 : ", req.value);
  // 내 친구목록 로딩
  searchByStatus(
    req.value,
    ({ data }) => {
      console.log(data);
      friends.value = data;
    },
    (error) => console.log(error)
  );
  // 내가 받은 친구요청 목록 로딩
  getReceived(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log(data);
      receivedList.value = data;
    },
    (error) => console.log(error)
  );
});

const user_answer = ref(201);
function positive(receivedId) {
  console.log(receivedId);
  user_answer.value = 201;
  callAnswer(receivedId);
}

function negative(receivedId){
  user_answer.value = 202;
  callAnswer(receivedId);
}

function callAnswer(receivedId) {
  console.log("요청 수락 혹은 거절 :", receivedId);
  const received = receivedList.value.filter((item) => item.id === receivedId)[0];
  
  if (received) {
    // received 객체에서 toUserId를 가져와 사용
    const toUserId = received.toUserId;

    answer({
      id: receivedId,
      fromUserId: memberStore.userInfo.userId,
      toUserId: toUserId,
      status: user_answer.value,
    });
  } else {
    console.error("Received request not found");
  }
}
</script>

<template>
  <div class="mypage-friendship">
    <h1>MY FRIENDSHIP</h1>
    <!-- 그냥 지금 나랑 친구상태인 녀석들 가져오는거랑 -> 그럼 back 에서 상태를 기준으로 검색하는 메소드 구현 필요 -->
    <div>
      <h3>내 친구 목록</h3>
      <div v-for="friend in friends" :key="friend.id">
        <p>친구 : {{ friend.userId }}</p>
        <p>친구일 : {{ friend.sinceDate }}</p>
        <button class="okBtn">상세보기</button>
      </div>
    </div>
    <div>
      <h3>내가 받은 친구 요청</h3>
      <div v-for="received in receivedList" :key="received.id">
        <p>요청한 친구 : {{ received.fromUserId }}</p>
        <button class="okBtn" @click='positive(received.id)'>수락</button><button @click='negative(received.id)'>거절</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
