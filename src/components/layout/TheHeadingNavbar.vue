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
          <router-link :to="{ name: 'board' }" class="nav-link active">게시판</router-link>
          <router-link :to="{ name: 'login' }" class="nav-link active">로그인</router-link>
          <a href="#" @click.prevent="logoutfunc" class="nav-link active">로그아웃</a>
          <router-link :to="{ name: 'join' }" class="nav-link active">회원가입</router-link>
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a {
  text-decoration: none;
  color: black;
  font-weight: bolder;

}

#homeBtn {
  font-weight: bold;

}

nav {
  background-color: #87C4FF !important;
  z-index: 100;
}
</style>
