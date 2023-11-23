<script setup>

</script>

<template>
    <div class='club-bg-img'>
        <div class = "club-view-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.club-bg-img{
  background: no-repeat url("../assets/images/background/section2.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
.club-view-container{
    width : 70%;
    margin-left: 15%;
    margin-right: 15%;
    height: 100%;
}
</style>
