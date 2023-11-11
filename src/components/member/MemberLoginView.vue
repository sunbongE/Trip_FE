<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { login } from "@/api/member";

const member = ref({
    userId: "",
    userPassword: "",
});

function onSubmit() {
    // 회원가입으로 호출
    calllogin();
}

function calllogin() {
    console.log("로그인 시도", member.value.userId);
  // API 호출
  login(member);
}

const router = useRouter();
const route = useRoute();
// ID 찾기
function moveFindId() {
  router.push({ name: "findid" });
}

// PW 찾기
function moveFindPw() {
  router.push({ name: "findpw" });
}
</script>

<template>
    <section>
		<div class="auth-top">
		
			<h2>로그인</h2>
			<h3>반갑습니다! 즐겁게 여행떠날 준비가 되었나요?</h3>
		</div>
		<!-- form -->
		<form @submit.prevent="onSubmit">
			<!-- <div style="display:flex; justify-content:end;">
			<c:if test="${empty ck }">
				<input type="checkbox" id="saveId" name="saveId" value='ok' /> 
			</c:if>
			<c:if test="${not empty ck }">
				<input type="checkbox" id="saveId" name="saveId" value='ok' checked=true/> 
			</c:if>
				<label for="saveId">아이디 저장</label>
					
			</div> -->
			<div class="auth-input-box">
				<div class="input-title">아이디</div>
				<input type="text" v-model="member.userId" required autofocus />
				
			</div>
			<div class="auth-input-box">
				<div class="input-title">비밀번호</div>
				<input type="password" v-model="member.userPassword" name="userPwd" id="userPwd" required />
			</div>
			<!-- 버튼 영역 -->
			<div class="auth-btn-box">
				<button class="btn btn-dark" type="submit" value="가입하기" id="signup-btn">로그인</button>
			</div>
    <div>
        <button class="btn btn-dark" type="button" @click="moveFindId">ID 찾기</button>
        <button class="btn btn-dark" type="button" @click="moveFindPw">PW 찾기</button>
    </div>
			<!-- <a href="${root}/member?action=joinForm" id="withdraw-btn"><p>회원이
					아니신가요? 여기를 클릭해주세요.</p></a> -->
		</form>
	</section>

</template>

<style scoped>
section {
  padding-top: 70px;
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 200px;
}

.auth-top {
  margin-top: 130px;
  animation: fadein 3s;
}

.auth-top h2 {
  font-size: 2.6em;
  font-weight: 700;
}

.auth-top h3 {
  font-size: 1.2em;
  font-weight: 600;
  color: #8b95a1;
  margin-top: 10px;
}

input:read-only {
  background-color: #f2f2f2;
}

#auth-mypage {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

#auth-mypage h4 {
  color: #772cf0;
  font-size: 0.8em;
  cursor: pointer;
}

#auth-form-container {
  width: 100%;
  margin-top: 80px;
  animation: fadein 3s;
}

.auth-input-box {
  margin-bottom: 26px;
}

.input-title {
  font-size: 1em;
  font-weight: 600;
  color: #6f6f6f;
  margin-bottom: 8px;
}

.auth-input-box input {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 14px;
  box-sizing: border-box;
}

.email-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.email-box input {
  width: 45%;
}

.email-box span {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
}

.region-box {
  display: flex;
  justify-content: space-between;
}

.region-box #region1,
#region2 {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 14px;
  box-sizing: border-box;
  width: 48%;
}

.auth-btn-box {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

.auth-btn-box input {
  background-color: #772cf0;
  border: none;
  width: 100%;
  height: 50px;
  color: #fff;
  border-radius: 6px;
  font-weight: 600;
}

#withdraw-btn {
  margin: 10px;
  text-align: center;
  text-decoration: none;
  color: #8b95a1;
  font-size: 0.8em;
  margin-top: 20px;
  cursor: pointer;
}

.id-box {
  display: flex;
  justify-content: space-between;
}

.id-box input[type="text"] {
  width: 80%;
}

.id-box input[type="button"] {
  width: 18%;
  background-color: #772cf0;
  color: #fff;
  border: none;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>