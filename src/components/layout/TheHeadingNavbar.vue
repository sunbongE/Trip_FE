<script setup>

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- <router-link :to="{ name: 'home' }" class="navbar-brand">BAROGA</router-link> -->
      <a id="homeBtn" href="/">BAROGA</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link :to="{ name: 'board' }" class="nav-link active">게시판</router-link>
          <router-link :to="{ name: 'member' }" class="nav-link active">member</router-link>
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#homeBtn {
  text-decoration: none;
  color: black;
  font-weight: bold;

}

nav {
  z-index: 100;
}
</style>
