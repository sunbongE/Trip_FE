<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";

const router = useRouter();

const memberStore = useMemberStore();

const { isLogin } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;
const { changeMenuState } = useMenuStore();

const loginUser = ref({
	userId: "",
	userPassword: "",
});



const login = async () => {
	await userLogin(loginUser.value);
	let token = sessionStorage.getItem("accessToken");
	if (isLogin) {
		getUserInfo(token);
		changeMenuState();
		console.log("come?")
	}
	// location.href = '/';
	router.push('/')
};



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
		<form @submit.prevent="login">

			<div class="auth-input-box">
				<div class="input-title">아이디</div>
				<input type="text" v-model.lazy="loginUser.userId" required autofocus />

			</div>
			<div class="auth-input-box">
				<div class="input-title">비밀번호</div>
				<input type="password" v-model.lazy="loginUser.userPassword" required />
			</div>
			<!-- 버튼 영역 -->
			<div class="auth-btn-box">
				<button class="btn btn-dark" @click.prevent="login">로그인</button>
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