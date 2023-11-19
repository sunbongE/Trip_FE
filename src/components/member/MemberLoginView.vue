<script setup>
import { ref, watch } from "vue";
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

const btncolor = ref("");

watch(loginUser.value, () => {
	if (loginUser.value.userId != '' && loginUser.value.userPassword != '') {
		btncolor.value = "okBtn"
	} else {
		btncolor.value = ""
	}
})

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
	<div id="frame">
		<div id="formBox">
			<div id="one"></div>
			<h3>Log in</h3>
			<p>Don’t have an ccount?
				<router-link to="/member/join"> Sign up</router-link>
			</p>
			<div id="mid">
				<hr><span id="or">OR</span>
				<hr>
			</div>
			<!-- form -->
			<form @submit.prevent="login">

				<div>
					<label for="id">Your ID</label><br>
					<input id="id" type="text" v-model="loginUser.userId" required autofocus />

				</div>
				<div>
					<label for="pwd">Your Password</label><br>
					<input id="pwd" type="password" v-model="loginUser.userPassword" required />
					<!-- 버튼 영역 -->
					<!-- <input type="button" value=""> -->
				</div>
				<div>

					<input :class="btncolor" type="button" @click.prevent="login" value="Login" />
				</div>
				<div id="findLink">
					<span @click="moveFindId">ID 찾기</span>
					<div id="per">/</div>
					<span @click="moveFindPw">PW 찾기</span>
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped>
@import "@/assets/sass/member/login.scss";
</style>