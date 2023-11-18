<script setup>
import { RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
import { useMenuStore } from "@/stores/menu";
import { useMemberStore } from "@/stores/member";
const menuStore = useMenuStore();
const memberStore = useMemberStore();
const { isLogin } = storeToRefs(memberStore);
const store = useMenuStore();
</script>

<template>
  <TheHeadingNavbar></TheHeadingNavbar>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>