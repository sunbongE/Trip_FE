<script setup>
import { onMounted, ref } from "vue";
import { useMemberStore } from "@/stores/member";
import { isCorrectPwd, update } from "@/api/member";
import router from "../../../router";
const memberStore = useMemberStore();

const inputpassword = ref("");
const isCorrect = ref(false);

function pwdCheck() {
  console.log(memberStore.userInfo.userId);
  console.log(inputpassword.value);
  isCorrectPwd(
    {
      userId: memberStore.userInfo.userId,
      userPassword: inputpassword.value,
    },
      ({ data }) => {
          if (data) {
              console.log("PW CHECK RESULT : ", data);
              isCorrect.value = data;
          } else {
              alert("비밀번호가 틀렸습니다.\n확인 후 다시 입력 바랍니다.");
          }
    },
    (error) => console.log(error)
  );
}

function updateEvent() {
  console.log(userDto.value);
    update(
        userDto.value,
        ({ data }) => {
            alert("회원 정보 수정에 성공하였습니다.");
            const accessToken = sessionStorage.getItem("accessToken");
            memberStore.getUserInfo(accessToken);
            router.push("/member/mypage");
        },
        (error) => console.log(error)
    )
}

function cancelEvent() {
    var confirmed = confirm("회원 정보 수정을 취소하시겠습니까 ?");
      if (confirmed) {

    router.push("/member/mypage");
    } else {
        console.log("취소를 하지 않습니다.");
    }
}

const userDto = ref({
  userId: memberStore.userInfo.userId,
  userName: "",
  emailId: "",
  emailDomain: "",
  userPassword: "",
});
</script>

<template>
  <article>
    <div>
      <h2 id="ment">회원 정보 수정</h2>
      <h2 id="subment">필요한 회원 정보를 수정해주세요</h2>
      <label>비밀번호 입력</label>
      <input type="password" v-model="inputpassword" @keyup.enter="pwdCheck" />

      <div v-show="isCorrect">
        <form id="articleForm" @submit.prevent="">
          <input type="hidden" name="articleNo" :value="memberStore.userInfo.userId" />
          <div id="formBox">
            <label for="subject">이름</label>
            <input type="text" autocomplete="off" v-model="userDto.userName" />

            <label for="content">새로운 비밀번호</label>
            <input type="password" autocomplete="off" v-model="userDto.userPassword" />

            <label for="email">이메일 ID</label>
            <div id="emailBox">
              <input type="text" v-model="userDto.emailId" name="email1" id="email1" required />
              <span>@</span>
              <input type="text" v-model="userDto.emailDomain" name="email2" id="email2" required />
            </div>
          </div>
          <div id="btnBox">
            <button type="button" @click="updateEvent">수정하기</button>
            <button type="button" @click="cancelEvent">취소</button>
          </div>
        </form>
      </div>
    </div>
  </article>
</template>

<style scoped>
@import "@/assets/sass/board/BoardForm.scss";

#emailBox {
  display: flex;
}
</style>
