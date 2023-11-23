<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { findClubById, searchClubMemberByClubId, deleteClub, updateClub, insertClubStatus } from "@/api/club";
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
const editMode = ref(false);
const editMode2 = ref(false);
const editedSubject = ref("");
const editedContent = ref("");
const toggleEditMode = () => {
  editMode.value = !editMode.value;
  // 편집 모드로 전환 시, 편집 중인 내용을 초기화
  if (editMode.value) {
    editedContent.value = club.value.content;
  }
};

const toggleEditMode2 = () => {
  editMode2.value = !editMode2.value;
  // 편집 모드로 전환 시, 편집 중인 내용을 초기화
  if (editMode2.value) {
    editedSubject.value = club.value.subject;
  }
};

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

function deleteEvent(id) {
  var confirmed = confirm(" 정말 삭제하시겠습니까 ?");
  if (confirmed) {
    console.log("삭제를 진행합니다 - CLUB ID : ", id);
    deleteClub(id);

    router.push("/club");
  } else {
    console.log("삭제를 하지 않습니다.");
  }
}
const modify = (type) => {
  console.log("수정된 내용:", editedContent.value);
  // update
  updateClub({
    id: club.value.id,
    [type]: editedContent.value,
  });
  editMode.value = false;
  club.value.content = editedContent.value;
};

const modify2 = (type) => {
  console.log("수정된 내용:", editedSubject.value);
  // update
  updateClub({
    id: club.value.id,
    [type]: editedSubject.value,
  });
  editMode2.value = false;
  club.value.subject = editedSubject.value;
};

const callInsertClubStatus = (id) => {
  insertClubStatus({
    fromUserId: memberStore.userInfo.userId,
    toUserId: id,
    clubId: route.params.clubId
  })
  alert(id+"님에게 동행 참가 요청을 보냈습니다.");
}
</script>
<template>
  <div id='frame'>

  <div class="top">
    <h1>동행 상세</h1>
    <h2>같이 여행 갈 친구들을 찾아보세요 !</h2>
  </div>
  <div class="detail-container">
    <div class="detail-header">
      <div class="header-subject">
        <div v-if="!editMode2" @click="toggleEditMode2">{{ club.subject }}</div>
        <input v-else v-model="editedSubject" @keyup.enter="modify2('subject')" />
        <img
          v-show="loginUser.userId === club.userId"
          v-if="!editMode2"
          src="@/assets/images/club/edit_icon.png"
          alt=""
          class="edit_icon"
          @click="toggleEditMode2"
        />
      </div>
      <div class="header-userid">작성자 : {{ club.userId }}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
</svg></div>
      <div class="header-register-time">등록일 : {{ club.registerTime }}</div>
    </div>
    <div class="detail-body">
      <div class="body-content">
        <!-- {{ club.content }}
        <img src="@/assets/images/club/edit_icon.png" alt="" class="edit_icon" /> -->
        <div v-if="!editMode" @click="toggleEditMode">{{ club.content }}</div>
        <input v-else v-model="editedContent" @keyup.enter="modify('content')" />
        <img
          v-show="loginUser.userId === club.userId"
          v-if="!editMode"
          src="@/assets/images/club/edit_icon.png"
          alt=""
          class="edit_icon"
          @click="toggleEditMode"
        />
      </div>
      <div class="body-planinfo">
        <div class="body-planinfo-item" v-for="info in attInfos" :key="info.contentId">
          <div v-if="info.firstImage || info.firstImage2" class="body-planinfo-item-img">
            <img :src="info.firstImage || info.firstImage2" alt="Image" class="image" />
          </div>
          <div v-else class="body-planinfo-item-img">
            <img
              v-show="loginUser.userId === club.userId"
              src="https://i.ibb.co/HgKFDHT/image-ready.png"
              alt="Image"
              class="image"
            />
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
        <button class="animate-button" @click="deleteEvent(club.id)">삭제</button>
      </div>
      <div class="common">
        <button class="animate-button" @click="goBack">뒤로</button>
        <button class="animate-button" @click="callInsertClubStatus(club.userId)">참가</button>
      </div>
    </div>
  </div>
</div>

</template>
<style scoped>
#frame{
  height: 100vh;
}
h1,h2{
  color: #fff !important;
}
.detail-container {
  background-color: #ecf7f7;
  width: 70%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease;
  max-height: 700px; /* 100%로 수정 */
  display: flex;
  flex-direction: column;
  border-radius: 15px;
}
.edit_icon {
  height: 10px;
  width: 10px;
}

.image {
  width: 40%;
  height: 100%;
}
.body-planinfo{
  overflow: scroll;
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
  height:100%;
}

.body-content {
  background-color: white;
  padding: 20px;
  width: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height:60vh;
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
  height:60vh;
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
