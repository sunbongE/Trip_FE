<script setup>
const logoutfunc = () => {
  console.log('로그아웃 요청')
}

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- <router-link :to="{ name: 'home' }" class="navbar-brand">BAROGA</router-link> -->
      <a id="homeBtn" class="navbar-brand" href="/">BAROGA</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a href="/board" class="nav-link active">게시판</a>
          <a href="/qna" class="nav-link active">QnA</a>
          <a href="/member/login" class="nav-link active">로그인</a>
          <a href="#" @click.prevent="logoutfunc" class="nav-link active">로그아웃</a>
          <a href="/member/join" class="nav-link active">회원가입</a>
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import "@/assets/sass/nav/nav.scss";
</style>
