<script setup></script>

<template>
  <div class = "mypage-menu">
    <div class="mypage-space"></div>
    <div class="mypage-bar">
      <ul class="menu">
        <li><router-link :to="{ name: 'mypage-info' }" class="menu-link">INFO</router-link></li>
        <li><router-link :to="{ name: 'mypage-plan' }" class="menu-link">PLAN</router-link></li>
        <li><router-link :to="{ name: 'mypage-club' }" class="menu-link">CLUB</router-link></li>
        <li><router-link :to="{ name: 'mypage-friendship' }" class="menu-link">FRIENDS</router-link></li>
        <li><router-link :to="{ name: 'mypage-alarm' }" class="menu-link">NOTICE</router-link></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mypage-menu{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.mypage-bar {
  background-color: #67d0f3;
  height: 50px;
  text-align: center;
  width: 80%; /*여기서 좌우 넓이 해야함*/
}
.mypage-space {
  height: 160px;
  background-color: white;
  border-radius: 50%;
}
.menu {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

.menu li {
  font-size: 20px;
  margin: 0 30px;
  padding : 6px;
}

.menu-link {
  text-decoration: none;
  font-weight: bold;
  color: #fff;
  transition: background-color 0.5s, color 0.5s; /*느리게 바낌*/
}

.menu-link:hover{
  background-color: #87cefa;
  color: #000;
  font-size: 20px;
}
.menu-link.router-link-active {
  color: #000;
  font-size: 20px;
}
</style>
