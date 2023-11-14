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
@import "@/assets/sass/member/login.scss";
 
</style>