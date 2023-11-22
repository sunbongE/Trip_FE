<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { findClubById, searchClubMemberByClubId } from "@/api/club";
import { searchPlanById } from "@/api/plan";
import { useMemberStore } from "@/stores/member";
import { findByContentId } from "@/api/tour";

const memberStore = useMemberStore();

const route = useRoute();
const router = useRouter();
const clubId = ref(0);
const club = ref([]);
const clubMember = ref([]);
const plan = ref([]);
const attInfos = ref([]);
// "id": 9,
//     "subject": "19번 plan ",
//     "content": "19 user1 content",
//     "userId": "user1",
//     "planId": 19,
//     "status": 1,
//     "registerTime": "2023-11-21 10:52:35",
//     "totalCnt": 10,
//     "people": 0
const loginUser = ref([]);
// onmounted 에선
// club의 userID 와 memberStore의 id 가 같으면 수정 삭제 버튼을 활성화 한다.
onMounted(async () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken && !memberStore.isLogin) {
    try {
      await memberStore.getUserInfo(accessToken);
    } catch (error) {
      console.error("Failed to fetch user information", error);
    }
  }

  loginUser.value = memberStore.userInfo;
  console.log("로그인 유저 : ", loginUser.value);

  clubId.value = route.params.clubId;
  // 개인 clubbyid 로 dto 가져오고
  //clubmember들도 가져오기
  // findclubbyid 로 가져온 dto 안에 planId로 , plan 의 정보까지 가져오기
  console.log("들어온 CLUB ID : ", clubId.value);
  findClubById(
    clubId.value,
    ({ data }) => {
      club.value = data;
      console.log("CLUB VALUE : ", club.value);
      searchPlanById(club.value.planId, ({ data }) => {
        plan.value = data;
        console.log(plan.value);
        data.infos.forEach((element) => {
          findByContentId(element.contentId, ({ data }) => {
            attInfos.value.push(data);
          });
        });
        console.log(attInfos);
      });
    },
    (error) => console.log(error)
  );

  searchClubMemberByClubId(
    clubId.value,
    ({ data }) => {
      clubMember.value = data;
      console.log("CLUBMEMBE VALUE ", clubMember.value);
    },
    (error) => console.log(error)
  );
});

function goBack() {
    router.back();
}
</script>
<template>
  <div class="top">
    <h1>동행 상세</h1>
    <h2>같이 여행 갈 친구들을 찾아보세요 !</h2>
  </div>
  <div class="detail-container">
    <div class="detail-header">
      <div class="header-subject">{{ club.subject }}</div>
      <div class="header-userid">작성자 : {{ club.userId }}</div>
      <div class="header-register-time">등록일 : {{ club.registerTime }}</div>
    </div>
    <div class="detail-body">
      <div class="body-content">{{ club.content }}</div>
      <div class="body-planinfo">
        <div class="body-planinfo-item" v-for="info in attInfos" :key="info.contentId">
          <div v-if="info.firstImage || info.firstImage2" class="body-planinfo-item-img">
            <img :src="info.firstImage || info.firstImage2" alt="Image" class="image" />
          </div>
          <div v-else class="body-planinfo-item-img">
            <img src="https://i.ibb.co/HgKFDHT/image-ready.png" alt="Image" class="image" />
          </div>
          <div class="body-planinfo-item-info">
            {{ info.title }}<br />
            {{ info.addr1 || info.addr2 }} <br />
            {{ info.tel }}
          </div>
        </div>
      </div>
    </div>
    <div class="detail-footer">
      <div class="iflogin" v-show="loginUser.userId === club.userId">
        <button class="animate-button" @click="animateButtons">수정</button>
        <button class="animate-button" @click="animateButtons">삭제</button>
      </div>
      <div class="common">
        <button class="animate-button" @click="goBack">뒤로</button>
        <button class="animate-button" @click="">참가</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.detail-container {
  background-color: #ecf7f7;
  width: 70%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease;
  height: 100%; /* 100%로 수정 */
  display: flex;
  flex-direction: column;
  border-radius: 15px;
}

.image {
  width: 40%;
  height: 100%;
}
.body-planinfo-item {
  background-color: white;
  display: flex;
  width: 100%;
  height: 25%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 5px;
}

.body-planinfo-item-img {
  width: 40%;
  padding: 10px;
  flex: 1;
}

.body-planinfo-item-info {
  width: 60%;
  padding: 10px;
  flex: 2;
}
.image {
  width: 100%;
  height: 100%;
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-subject {
  padding: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  animation: fadeInUp 2s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-userid,
.header-register-time {
  margin-left: 10px;
}

.detail-body {
  display: flex;
}

.body-content {
  background-color: white;
  padding: 20px;
  width: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.body-planinfo {
  background-color: white;
  width: 50%;
  box-sizing: border-box;
  padding: 10px;
  height: 600px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-left: 6px;
}

.detail-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.iflogin,
.common {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.iflogin button,
.common button {
  padding: 10px 20px;
  background-color: skyblue;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.animate-button:hover {
  background-color: #3571a1;
}

h1 {
  font-weight: bold;
  font-size: 60px;
}
h2 {
  font-size: 45px;
  color: #555;
  animation: fadeInUp 3s ease; /* fadeInUp 애니메이션 적용 */
}

.top {
  text-align: center;
  padding: 50px;
}
</style>
