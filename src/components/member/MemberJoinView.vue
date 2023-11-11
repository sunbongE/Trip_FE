<script setup>
import { ref, watch } from "vue";
import { join } from "../../api/member";

// 1. 담아서 보낼 객체 생성
const member = ref({
    userId: "",
    userName: "",
    userPassword: "",
    birth: "",
    emailId: "",
    emailDomain :"",
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
section {
  padding-top: 70px;
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: 200px;
}

.auth-top {
  margin-top: 130px;
  animation: fadein 3s;
}

.auth-top h2 {
  font-size: 2.6em;
  font-weight: 700;
}

.auth-top h3 {
  font-size: 1.2em;
  font-weight: 600;
  color: #8b95a1;
  margin-top: 10px;
}

input:read-only {
  background-color: #f2f2f2;
}

#auth-mypage {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

#auth-mypage h4 {
  color: #772cf0;
  font-size: 0.8em;
  cursor: pointer;
}

#auth-form-container {
  width: 100%;
  margin-top: 80px;
  animation: fadein 3s;
}

.auth-input-box {
  margin-bottom: 26px;
}

.input-title {
  font-size: 1em;
  font-weight: 600;
  color: #6f6f6f;
  margin-bottom: 8px;
}

.auth-input-box input {
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 14px;
  box-sizing: border-box;
}

.email-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.email-box input {
  width: 45%;
}

.email-box span {
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
}

.region-box {
  display: flex;
  justify-content: space-between;
}

.region-box #region1,
#region2 {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 14px;
  box-sizing: border-box;
  width: 48%;
}

.auth-btn-box {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

.auth-btn-box input {
  background-color: #772cf0;
  border: none;
  width: 100%;
  height: 50px;
  color: #fff;
  border-radius: 6px;
  font-weight: 600;
}

#withdraw-btn {
  margin: 10px;
  text-align: center;
  text-decoration: none;
  color: #8b95a1;
  font-size: 0.8em;
  margin-top: 20px;
  cursor: pointer;
}

.id-box {
  display: flex;
  justify-content: space-between;
}

.id-box input[type="text"] {
  width: 80%;
}

.id-box input[type="button"] {
  width: 18%;
  background-color: #772cf0;
  color: #fff;
  border: none;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>