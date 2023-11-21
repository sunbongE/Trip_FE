<script setup>
import { onMounted, ref, computed } from "vue";
import { useMemberStore } from "@/stores/member";
import {
  addClubMember,
  searchMyClubs,
  searchByToUserId,
  searchByFromUserId,
  replyToAnswer,
} from "@/api/club";
import { useClubStore } from "@/stores/club";
import { storeToRefs } from "pinia";

const memberStore = useMemberStore();

const clubStore = useClubStore();
const { myClubs, toMeList, fromMeList } = storeToRefs(clubStore);

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
      console.log("나의 클럽 : ", data);
      myClubs.value = data;
    },
    (error) => console.log(error)
  );

  searchByToUserId(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log("나에게온 요청 : ", data);
      toMeList.value = data;
    },
    (error) => console.log(error)
  );

  searchByFromUserId(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log("내가 보낸 : ", data);
      fromMeList.value = data;
    },
    (error) => console.log(error)
  );
});

function acceptEvent(dto) {
  // 성공 이벤트
  // 참가받아주기
  console.log("요청상태 수락변경 - status ID : ", dto.id);
  console.log("요청상태 수락변경 - status clubID : ", dto.clubId);
  console.log("요청상태 수락변경 - status userID : ", dto.userId);

  replyToAnswer({
    id: dto.id,
    answer: 101,
  });
  deleteToMeList(dto.id);
  plusPeopleOfMyClubs(dto.id);
  location.reload();
}

function rejectEvent(dto) {
  replyToAnswer({
    id: dto.id,
    answer: 102,
  });

  deleteToMeList(dto.id);
}

const deleteToMeList = function (id) {
  toMeList.value = toMeList.value.filter((item) => item.id !== id);
};

// myClubs.value.people = computed(toMeList.length, () => {
//   return value[index].people++;
// })

const plusPeopleOfMyClubs = function (id) {
  const index = myClubs.value.findIndex(item => item.id === id);

  if (index !== -1) {
    // 찾았을 때만 업데이트
    myClubs.value[index].people = computed(toMeList.length, () => {
      return value[index].people++;
    })
  }
}
</script>

<template>
  <div class="mypage-club">
    <h1>MY CLUB</h1>
    <h3>내 클럽 목록</h3>
    <div v-for="mc in myClubs" :key="mc.id">
      <p>클럽명 : {{ mc.subject }}</p>
      <p>클럽소개 : {{ mc.content }}</p>
      <p>현재 상태 : {{ mc.status === 1 ? "모집중" : "모집완료" }}</p>
      <p>인원 : {{ mc.people }}/{{ mc.totalCnt }}</p>
      <button class="okBtn">상세보기</button>
    </div>

    <h3>나에게 온 요청</h3>
    <div v-for="tm in toMeList" :key="tm.id">
      <div v-show="tm.answer === 103">
        <p>FROM : {{ tm.fromUserId }}</p>
        <p>TO : {{ tm.toUserId }}</p>
        <button class="okBtn" @click="acceptEvent(tm)">수락</button
        ><button @click="rejectEvent(tm)">거절</button>
      </div>
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
