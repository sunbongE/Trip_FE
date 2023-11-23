<script setup>
import { onMounted, ref } from "vue";
import MyPageNavBar from "./mypage/MyPageNavBar.vue";

import { useMemberStore } from "@/stores/member";
import { findProfileByUserId, registerProfile } from "@/api/member";

const memberStore = useMemberStore();

const img_src = ref("");
const profileInfo = ref([]);

onMounted(async () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken && !memberStore.isLogin) {
    try {
      await memberStore.getUserInfo(accessToken);
    } catch (error) {
      console.error("Failed to fetch user information", error);
    }
  }

  findProfileByUserId(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log("나의 클럽 : ", data);
      profileInfo.value = data;
      img_src.value =
        "http://localhost/baroga/upload/" +
        profileInfo.value.saveFolder +
        "/" +
        profileInfo.value.saveFile;
      console.log(img_src.value);
    },
    (error) => {
      img_src.value =
        "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/%EC%9C%A0%ED%8A%9C%EB%B8%8C_%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84_%ED%95%98%EB%8A%98%EC%83%89.jpg?type=w800";
      console.log(img_src.value);
    }
  );
});

// profile image
const showForm = ref(false);
const fileInput = ref([]);
const formData = new FormData();

const toggleFormVisibility = () => {
  showForm.value = !showForm.value;
};

const handleFileChange = (event) => {
  const files = event.target.files;
  console.log("files : ", files);
  console.log("파일이 선택되었습니다.");
  fileInput.value = files;
  let boardJson = JSON.stringify({
    userId: memberStore.userInfo.userId,
  });
  console.log("fileInput.value : ", fileInput.value);
  let board = new Blob([boardJson], { type: "application/json" });
  formData.append("userId", board);
  formData.append("upfile", fileInput.value[0]);
  console.log("formdata : ", formData);
};

const uploadFile = () => {
  // 파일 업로드 로직 구현
  console.log("파일을 업로드합니다.");
  // 폼 숨기기
  showForm.value = false;

  registerProfile(
    formData,
    (response) => {
      location.reload();
    },
    (error) => {
      console.error("파일 업로드 중 오류 발생:", error);
    }
  );
};
</script>

<template>
  <div class="mypage-edgeline">
    <div class="mypage-home-profile-parent">
      <img :src="img_src" class="mypage-home-profile" />
      <button class="custom-button" @click="toggleFormVisibility">
        <img src="@/assets/images/club/edit_icon.png" alt="Image" class="image" />
      </button>

      <!-- 파일 업로드 폼 -->
      <form v-show="showForm" @submit.prevent="uploadFile" class="upload-form" enctype="multipart/form-data">
        <input type="file" id="upfile" name="upfile" accept="image/*" multiple="multiple" @change="handleFileChange" />
        <button type="submit" class="okBtn">업로드</button>
        <button type="submit" @click="toggleFormVisibility" class="cancelBtn">취소</button>
      </form>
    </div>

    <div class="c">
      <div class="mypage-nav-bar">
        <MyPageNavBar />
      </div>

      <div class="바뀔녀석들">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c {
  overflow-y: scroll;
  width: 70%;
  height: 800px;
  border: 2px solid skyblue;
  /* height: 90%; */
  border-radius: 20px;
  transform: translateY(-130px);
}

.mypage-edgeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  height: 90%;
}

.mypage-home-profile-parent {
  margin-top: 100px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  z-index: 1;
  display: flex;
  /* Flexbox를 사용하여 가운데 정렬을 위한 설정 추가 */
  align-items: center;
  /* 세로 중앙 정렬 */
  justify-content: center;
  /* 가로 중앙 정렬 */
  position: relative;
}

.mypage-home-profile {
  width: 98%;
  height: 98%;
  border-radius: 50%;
  z-index: 2;
  border: 5px solid skyblue;
}

.mypage-nav-bar {
  width: 100%;
  display: inline-block;
}

.custom-button {
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  width: 40px;
  background: transparent;
}

.image {
  position: absolute;
  right: 0px;
  bottom: 10px;
  width: 36px;
  height: 36px;
}

.upload-form {
  z-index: 5;
  position: absolute;
  right: -450px;
  bottom: 20px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .c {
    width: 70%;
    border: 2px solid skyblue;
    /* height: 90%; */
    border-radius: 20px;
    transform: translateY(-60px);
  }

  .mypage-home-profile-parent {
    margin-top: 20px;
    width: 150px;
    height: 150px;
    background-color: skyblue;
  }

  .mypage-home-profile {
    border-radius: 50%;
  }

  .custom-button {
    position: absolute;
    bottom: 69%;
    /* 원하는 위치로 조절 */
    right: 37%;
    /* 원하는 위치로 조절 */
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    width: 30px;
    background: transparent;
  }

  .image {
    width: 100%;
    height: 100%;
  }

  .upload-form {
    position: absolute;
    bottom: 55%;
    right: 20%;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}
</style>
