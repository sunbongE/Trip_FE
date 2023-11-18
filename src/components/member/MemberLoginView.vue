<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { login } from "@/api/member";
import { storeToRefs } from "pinia";
const member = ref({
	userId: "",
	userPassword: "",
});



const loginFunc = async () => {
	console.log("login ing!!!! !!!");
	await userLogin(loginUser.value);
	let token = sessionStorage.getItem("accessToken");
	console.log("111. ", token);
	console.log("isLogin: ", isLogin);
	if (isLogin) {
		console.log("로그인 성공아닌가???");
		getUserInfo(token);
		changeMenuState();
	}
	router.push("/");
};

function calllogin() {
	console.log("로그인 시도", member.value.userId);
	// API 호출
	login(member);
}

const router = useRouter();
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
		<form @submit.prevent="calllogin">

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
				<button class="btn btn-dark" @click="calllogin">로그인</button>
			</div>
			<div>
				<button class="btn btn-dark" type="button" @click="moveFindId">ID 찾기</button>
				<button class="btn btn-dark" type="button" @click="moveFindPw">PW 찾기</button>
			</div>
		</form>
	</section>
</template>

<style scoped>
@import "@/assets/sass/member/login.scss";
</style>