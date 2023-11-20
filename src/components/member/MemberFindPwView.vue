<script setup>
import { ref, watch } from "vue";
import { findpw } from "@/api/member";
import { useRouter } from 'vue-router';
const router = useRouter(); 
const member = ref({
  userId: "",
  emailId: "",
  birth: "",
});

function onSubmit() {
  callfindpw();
}

function callfindpw() {
  // API 호출
	findpw(member,
		({data}) => {
			alert("임시 비밀번호 발급 : " + data)
			router.push("login")
		},
		(error) => {
			alert("일치하는 회원 정보가 없습니다.")
		
	});
}


</script>

<template>
    <div id='frame'>
		<div id="formBox">

		<div class="auth-top">
			<h2>PW 찾기 페이지</h2>
			<h3>패스워드를 잊어버리셨나요 ?</h3>
		</div>
		<!-- form -->
		<form @submit.prevent="onSubmit">
			<div class="auth-input-box">
				<div class="input-title">아이디</div>
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
			<div class='btnBox'>
				<button type="submit" class="okBtn">찾기</button>
			</div>
				</form>
		</div>
	
	</div>

</template>

<style scoped>
@import "@/assets/sass/member/find.scss";
</style>