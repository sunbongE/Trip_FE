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
  const index = myClubs.value.findIndex((item) => item.id === id);

  if (index !== -1) {
    // 찾았을 때만 업데이트
    myClubs.value[index].people = computed(toMeList.length, () => {
      return value[index].people++;
    });
  }
};
</script>

<template>
  <div class="mypage-club">
    <h1>MY CLUB</h1>
    <h3>내 클럽 목록</h3>
    <div id="clubListFrame">
      <div class="clubList" v-for="mc in myClubs" :key="mc.id">
        <p>클럽명 : {{ mc.subject }}</p>
        <p>클럽소개 : {{ mc.content }}</p>
        <p>현재 상태 : {{ mc.status === 1 ? "모집중" : "모집완료" }}</p>
        <div class="footItem">
          <p>인원 : {{ mc.people }}/{{ mc.totalCnt }}</p>
          <button class="okBtn">
            <router-link :to="{ name: 'club-detail', params: { clubId: mc.id } }"> 자세히 </router-link>
          </button>
        </div>
      </div>
    </div>
    <div id="reqresFrame">
      <div id="req">
        <h3>나에게 온 요청</h3>
        <div id="reqItems" v-for="tm in toMeList" :key="tm.id">
          <div id="reqItem" v-show="tm.answer === 103 || tm.answer === 0">
            <p>보낸사람 : {{ tm.fromUserId }}</p>
            <div id="reqBtns">

              <button class="okBtn" @click="acceptEvent(tm)">수락</button>
              <button class="cancelBtn" @click="rejectEvent(tm)">거절</button>
            </div>
          </div>
        </div>
      </div>
      <div id="res">
        <h3>내가 보낸 요청</h3>
        <div id="resItems">
          <div id="resItem" v-for="fm in fromMeList" :key="fm.id">
            <p>받는사람 : {{ fm.fromUserId }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: white;
}

.mypage-club {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
}

.clubList {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  border: 1px solid #d3d3d3;
  padding: 20px;
  border-radius: 6px;
}

.footItem {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.footItem>p {
  margin: 0;
  display: flex;
  align-items: flex-end;
}

#clubListFrame {
  margin: 4em 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3em;
}

#reqresFrame {
  width: 100%;
  border: 1px solid #d3d3d3;
  border-width: 1px 0 0 0;
  display: grid;
  grid-template-columns: 6fr 6fr;
}

#res,
#req {
  border: 1px solid #d3d3d3;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  padding: 20px 5px 5px 0;
}

#res {
  border-width: 0 0 0 1px;
}

#req {
  border-width: 0 1px 0;
}

#req>h3,
#res>h3 {
  margin-bottom: 30px;
}


#reqItems {
  width: 90%;
  display: flex;
  flex-direction: row;
  grid-gap: 1em;
  justify-content: center;
}


#resItems {

  width: 90%;
  display: flex;
  flex-direction: column;
}

#resItem,
#reqItem {
  width: 90%;
  height: 50px;
  display: flex;
}

#resItem>p,
#reqItem>p {
  margin: 0;
  display: flex;
  align-content: center;
  align-items: center;
}

#reqBtns {
  display: flex;
  align-items: center;
  margin-left: auto;
}
</style>
