<script setup>
import { RouterView } from "vue-router";
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
</script>

<template>
  <TheHeadingNavbar></TheHeadingNavbar>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>