<script setup>
import { ref, watch } from "vue";
import { findid } from "@/api/member";
import { useRouter } from 'vue-router';
const router = useRouter(); 
const member = ref({
  emailId: "",
  userPassword: "",
  birth: "",
});

function onSubmit() {
  callfindid();
}

function callfindid() {
  // API 호출
	findid(member,
		({data}) => {
			alert("회원님의 아이디 : " + data + "입니다. \n로그인 페이지도 이동합니다.")
			router.push("login")
		},
		(error) => {
		alert("일치하는 정보가 없습니다. 다시 확인해주세요.")
	});
}

</script>

<template>
    <div id='frame'>
		<div id="formBox">

		<div class="auth-top">
			<h2>ID 찾기 페이지</h2>
			<h3>아이디를 잊어버리셨나요 ?</h3>
		</div>
		<!-- form -->
		<form @submit.prevent="onSubmit">
			<div>
				<label>이메일</label>
				<input type="text" v-model="member.emailId" autofocus required />
			</div>
			<div>
				<label>비밀번호</label>
				<input type="password" v-model="member.userPassword" required />				
			</div>
			<div>
				<label>생년월일</label>
				<input type="text" v-model="member.birth" required />
			</div>
			<!-- 버튼 영역 -->
			<div class="btnBox">
				<button type="submit" class='okBtn'>찾기</button>
			</div>
			<!-- <a href="${root}/member?action=joinForm" id="withdraw-btn"><p>회원이
					아니신가요? 여기를 클릭해주세요.</p></a> -->
		</form>
	</div>

	</div>
</template>

<style scoped>

@import "@/assets/sass/member/find.scss";
</style>