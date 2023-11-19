<script setup>
import { ref } from "vue";
import { join, checkId } from "../../api/member";
// 1. 담아서 보낼 객체 생성
const member = ref({
	userId: "",
	userName: "",
	userPassword: "",
	birth: "",
	emailId: "",
	emailDomain: "",
});

const checkIdFunc = () => {
	const userId = member.value.userId;
	checkId(userId,
		(response) => {
			console.log("ssssssssssssss")
			console.log(response);
		},
		(error) => {
			console.log("Error:", error);
		}
	);
};

function onSubmit() {
	// 회원가입으로 호출
	joinMember();
}

function joinMember() {
	console.log("회원가입 시도", member.value.userId);
	// API 호출
	join(member);
}

// function cancel() {
// 	router.push({ name: "member" });
// }

</script>

<template>
	<div id="frame">
	<div id="formBox">
		<h3>회원가입</h3>
		<!-- form -->
		<form @submit.prevent="onSubmit">
			<div class="auth-input-box">
				<label>아이디</label>
				<div id="id-box">
					<input type="text" v-model="member.userId" name="userId" id="userId" required />
					<input type="button" class="okBtn" name="userIdChkBtn" id="userIdChkBtn" value="중복확인"
							@click="checkIdFunc" />
					</div>
				</div>

				<div class="auth-input-box">
					<label>이름</label>
					<input type="text" v-model="member.userName" name="username" id="userName" autofocus required />
				</div>

				<div class="auth-input-box">
					<label>생년월일 6자리</label>
					<input type="text" v-model="member.birth" name="birth" id="birth" placeholder="예) 960922" />
				</div>

				<div class="auth-input-box">
					<label>비밀번호 </label>
					<input type="password" v-model="member.userPassword" name="userPwd" id="userPwd" required />
				</div>
				<div class="auth-input-box">
					<label>비밀번호 확인 <span id='pwdChk'></span></label>
					<input type="password" name="userPwdChk" id="userPwdChk" required />
				</div>
				<div class="auth-input-box">
					<label>이메일</label>

					<div class="email-box">
						<input type="text" v-model="member.emailId" name="email1" id="email1" required /> <span>@</span>
						<input type="text" v-model="member.emailDomain" name="email2" id="email2" required />
					</div>
				</div>
				<!-- <div class="auth-input-box">
																																																			<label>지역</label>
																																																			<div class="region-box">
																																																				<select name="region1" id="region1">
																																																					<option value="">지역</option>
																																																					<c:forEach var="item" items="${sidoList}">
																																																						<option value="${item.sidoCode}">${item.sidoName}</option>
																																																					</c:forEach>
																																																				</select> <select name="region2" id="region2">
																																																				<option value="">시군구</option>
																																																				</select>
																																																			</div>
																																																		</div> -->

				<!-- 버튼 영역 -->
				<div class="auth-btn-box">
					<button class="btn btn-dark" type="submit" id="signup-btn">가입하기</button>
				</div>
				<div class="auth-btn-box">
					<button class="btn btn-dark" type="button">취소</button>
				</div>

			</form>
		</div>


	</div>
</template>

<style scoped>
@import "@/assets/sass/member/join.scss";
</style>