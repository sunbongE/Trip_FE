<script setup>
import { ref, watch } from "vue";
import { findpw } from "@/api/member";

const member = ref({
  userId: "",
  emailId: "",
  birth: "",
});

function onSubmit() {
  // 회원가입으로 호출
  callfindpw();
}

function callfindpw() {
  console.log("비밀번호 찾기 슛", member.value.userId);
  // API 호출
  findpw(member);
}


</script>

<template>
    <section>
		<div class="auth-top">
		
			<h2>PW 찾기 페이지</h2>
			<h3>패스워드를 잊어버리셨나요 ?</h3>
		</div>
		<!-- form -->
		<form @submit.prevent="onSubmit">
			<div class="auth-input-box">
				<div class="input-title">이름</div>
				<input type="text" v-model="member.userId" required autofocus />
				
			</div>
			<div class="auth-input-box">
				<div class="input-title">이메일</div>
				<input type="text" v-model="member.emailId" required />
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