<script setup>
import { RouterView } from "vue-router";
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
</script>

<template>
  <TheHeadingNavbar></TheHeadingNavbar>
  <div id="views">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>