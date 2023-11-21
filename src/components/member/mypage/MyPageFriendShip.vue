<script setup>
import { onMounted, ref, watch } from "vue";
import { useMemberStore } from "@/stores/member";
import { searchByStatus, getReceived, answer } from "@/api/friendship";
import { useFriendshipStore } from "@/stores/friend";
import { storeToRefs } from "pinia";

const friendshipStore = useFriendshipStore();
const memberStore = useMemberStore();
const { friends, receivedList } = storeToRefs(friendshipStore);
const { setFriends, setReceivedList, deleteReceivedList } = friendshipStore;

const req = ref({
  userId: "",
  status: 201,
});

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
      console.log("내친구목록 : ", data);
      setFriends(data);
    },
    (error) => console.log(error)
  );
  // 내가 받은 친구요청 목록 로딩
  getReceived(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log("친구요청" + data);
      // receivedList.value = data;
      setReceivedList(data);
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

function negative(receivedId) {
  user_answer.value = 202;
  callAnswer(receivedId);
}
async function callAnswer(receivedId) {
  console.log("요청 수락 혹은 거절 :", receivedId);
  const received = receivedList.value.filter((item) => item.id === receivedId)[0];

  if (received) {
    // received 객체에서 toUserId를 가져와 사용
    const toUserId = received.toUserId;

    await answer({
      id: receivedId,
      fromUserId: memberStore.userInfo.userId,
      toUserId: toUserId,
      status: user_answer.value,
    });

    await deleteReceivedList(receivedId);
    location.reload();
  } else {
    console.error("Received request not found");
  }

}
</script>

<template>
  <div class="mypage-friendship">
    <h1>MY FRIENDSHIP</h1>
    <div>
      <h3>내 친구 목록</h3>
      <ul>
        <li v-for="friend in friends" :key="friend.id" class="friend-item">
          <span class="info">친구: {{ friend.userId }}</span>
          <span class="info">친구일: {{ friend.sinceDate }}</span>
          <button class="okBtn">상세보기</button>
        </li>
      </ul>
    </div>
    <div>
      <h3>내가 받은 친구 요청</h3>
      <ul>
        <li v-for="received in receivedList" :key="received.id" class="received-item">
          <div v-if="received.status === 203" class="request-info">
            <span class="info">요청한 친구: {{ received.fromUserId }}</span>
            <button class="okBtn" @click="positive(received.id)">수락</button>
            <button @click="negative(received.id)">거절</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mypage-friendship {
  width: 100%;
  padding: 20px;
  text-align: center;
}

.friend-list {
  text-align: center;
}

.friend-item {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.friend-item:hover {
  background-color: #cfd8dc;
}

.info {
  margin-right: 10px;
  font-size: 16px;
}
.received-list {
  text-align: center;
}

.received-item {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.received-item:hover {
  background-color: #cfd8dc;
}

.request-info {
  font-size: 16px;
}
</style>
