<script setup>
import { onMounted, ref } from "vue";
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
const getFriendList = () => {
  // 내 친구목록 로딩
  searchByStatus(
    req.value,
    ({ data }) => {
      console.log("내친구목록 : ", data);
      setFriends(data);
    },
    (error) => console.log(error)
  );
}
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

  getFriendList()
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
function callAnswer(receivedId) {
  console.log("요청 수락 혹은 거절 :", receivedId);
  const received = receivedList.value.filter((item) => item.id === receivedId)[0];

  if (received) {
    // received 객체에서 toUserId를 가져와 사용
    const toUserId = received.fromUserId;
    console.log(">>>>", memberStore.userInfo.userId, toUserId)
    answer({
      id: receivedId,
      fromUserId: memberStore.userInfo.userId, //   
      toUserId: toUserId,                      //  
      status: user_answer.value,
    },
      (Response) => {
        getFriendList()
      });

    deleteReceivedList(receivedId);

  } else {
    console.error("Received request not found");
  }
}
const ban = (toUser, id) => {
  const req = ref({
    "id": id,
    "fromUserId": memberStore.userInfo.userId,
    "toUserId": toUser,
    "status": 204
  })
  answer(req.value,
    (Response) => {
      getFriendList()
      alert(`${toUser}님을 차단하였습니다.`)
    })
  console.log(toUser, id)

}
</script>

<template>
  <div class="mypage-friendship">
    <h1>MY FRIENDSHIP</h1>
    <div id="frame">
      <div id="list">
        <h3>내 친구 목록</h3>
        <ul>
          <li v-for="friend in friends" :key="friend.id" class="friend-item">
            <div class="box">
              <span class="info">ID : {{ friend.userId }}</span>
              <span class="info">친구일: {{ friend.sinceDate }}</span>
            </div>
            <button class="okBtn" @click="ban(friend.userId, friend.id)">차단</button>
          </li>
        </ul>
      </div>
      <div id="req">
        <h3>내가 받은 친구 요청</h3>
        <ul>
          <template v-for="received in receivedList">
            <li v-if="received.status === 203" :key="received.id" class="received-item">
              <div class="request-info">
                <span class="info">요청한 친구: {{ received.fromUserId }}</span>
                <button class="okBtn" @click="positive(received.id)">수락</button>
                <button class="cancelBtn" @click="negative(received.id)">거절</button>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 50px;
}

h3 {
  margin: 50px 0;
}

.box {
  display: flex;
  grid-gap: 0.4em;
  flex-direction: column;
  align-items: flex-start;
}

#frame {
  display: grid;
  grid-template-columns: 6fr 6fr;
}

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
  justify-content: space-between;
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
