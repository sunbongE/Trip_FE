<script setup>
import { ref, watch } from "vue";
import { findid } from "@/api/member";

const member = ref({
  emailId: "",
  userPassword: "",
  birth: "",
});

function onSubmit() {
  // 회원가입으로 호출
  callfindid();
}

function callfindid() {
  console.log("아이디 찾기 슛", member.value.emailId);
  // API 호출
  findid(member);
}

</script>

<template>
    <section>
		<div class="auth-top">
		
			<h2>ID 찾기 페이지</h2>
			<h3>아이디를 잊어버리셨나요 ?</h3>
		</div>
		<!-- form -->
		<form @submit.prevent="onSubmit">
			<div class="auth-input-box">
				<div class="input-title">이메일</div>
				<input type="text" v-model="member.emailId" autofocus required />
			</div>
			<div class="auth-input-box">
				<div class="input-title">비밀번호</div>
				<input type="password" v-model="member.userPassword" required />				
			</div>
			<div class="auth-input-box">
				<div class="input-title">생년월일</div>
				<input type="text" v-model="member.birth" required />
			</div>
			<!-- 버튼 영역 -->
			<div class="auth-btn-box">
				<button type="submit" id="signup-btn">찾기</button>
			</div>
			<!-- <a href="${root}/member?action=joinForm" id="withdraw-btn"><p>회원이
					아니신가요? 여기를 클릭해주세요.</p></a> -->
		</form>
	</section>
</template>

<style scoped>

@import "@/assets/sass/member/find.scss";
</style>