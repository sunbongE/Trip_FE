<script setup>
import { ref } from "vue";
import { join } from "../../api/member";

// 1. 담아서 보낼 객체 생성
const member = ref({
	userId: "",
	userName: "",
	userPassword: "",
	birth: "",
	emailId: "",
	emailDomain: "",
});


function onSubmit() {
	// 회원가입으로 호출
	joinMember();
}

function joinMember() {
	console.log("회원가입 시도", member.userId);
	// API 호출
	join(member);
}

function cancel() {
	router.push({ name: "member" });
}

</script>

<template>
	<div>
		<section>
			<div>
				<h2>회원가입</h2>
				<h3>EnjoyTrip에서 제공하는 다양한 서비스를 이용해보세요.</h3>
			</div>
			<!-- form -->
			<form @submit.prevent="onSubmit">
				<div class="auth-input-box">
				<div class="input-title">이름</div>
				<input type="text" v-model="member.userName" name="username" id="userName" autofocus required />
			</div>
			<div class="auth-input-box">
				<div class="input-title">생년월일 6자리</div>
				<input type="text" v-model="member.birth" name="birth" id="birth" placeholder="예) 960922" />
			</div>
			<div class="auth-input-box">
				<div class="input-title">
					아이디 <span id="validMsg"></span>
				</div>
				<div class="id-box">
						<input type="text" v-model="member.userId" name="userId" id="userId" required />
						<input type="button" name="userIdChkBtn" id="userIdChkBtn" value="중복확인" />
					</div>
				</div>
				<div class="auth-input-box">
					<div class="input-title">비밀번호 </div>
					<input type="password" v-model="member.userPassword" name="userPwd" id="userPwd" required />
				</div>
				<div class="auth-input-box">
					<div class="input-title">비밀번호 확인 <span id='pwdChk'></span></div>
					<input type="password" name="userPwdChk" id="userPwdChk" required />
				</div>
				<div class="auth-input-box">
					<div class="input-title">이메일</div>
					<div class="email-box">
						<input type="text" v-model="member.emailId" name="email1" id="email1" required /> <span>@</span>
						<input type="text" v-model="member.emailDomain" name="email2" id="email2" required />
					</div>
				</div>
				<!-- <div class="auth-input-box">
																	<div class="input-title">지역</div>
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

		</section>

	</div>
</template>

<style scoped>
@import "@/assets/sass/member/join.scss";
</style>