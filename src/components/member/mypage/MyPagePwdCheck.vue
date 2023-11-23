<script setup>
import { onMounted, ref } from "vue";
import { useMemberStore } from "@/stores/member";
import { isCorrectPwd, update } from "@/api/member";
import router from "../../../router";
const memberStore = useMemberStore();

const inputpassword = ref("");
const isCorrect = ref(false);
const isInputed = ref(true);

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
              isInputed.value = false;
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
    <div class="modify-container">
      <h2 id="ment">회원 정보 수정</h2>
      <h2 id="subment">필요한 회원 정보를 수정해주세요</h2>
      <div v-show="isInputed">
        <label>비밀번호 입력</label>
        <input type="password" v-model="inputpassword" @keyup.enter="pwdCheck" />
      </div>
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

article {
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
    width: 100%;
    animation: fadein 3s;
  }
  
  #ment {
    font-size: 2.6em;
    font-weight: 700;
  }
  
  #subment {
    font-size: 1.2em;
    font-weight: 600;
    margin-top: 10px;
    color: #8b95a1;
  }
  
  #formBox {
    width: 100%;
    padding: 50px 0;
  }
  
  #articleForm {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  #articleForm label {
    color: #6f6f6f;
  }
  
  #articleFrom input:nth-child(1) {
    border-radius: 6px;
    border: 1px solid #d9d9d9;
    background: #f2f2f2;
  }
  
  #articleForm input {
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    width: 100%;
    height: 40px;
    border-radius: 6px;
    padding: 10px;
  }
  
  #articleForm textarea {
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    width: 100%;
    border-radius: 6px;
    padding: 10px;
    resize: none;
  }
  
  #articleForm label {
    margin: 20px 0 5px 0;
  }
  
  #btnBox {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }
  
  #btnBox button {
    margin: 0 10px;
    width: 120px;
    height: 50px;
    border-radius: 6px;
    background: #f7f8fa;
    border: 1px solid #d9d9d9;
    font-size: 1.1em;
  }
  
  #btnBox button:hover {
    cursor: pointer;
  }
  
  #btnBox button:nth-child(2) {
    color: #fff;
    background: #51abf3;
    border: 1px solid #51abf3;
  }
  #imgBox{
    display: flex;
    flex-direction: row;
    height: 450px;
    width: 100%;
    grid-gap: 2em;
    overflow: scroll;
  }

  img{
    height: 400px;
    width: 400px;
  }

#modify-container {
    width : 80%;
}
</style>
