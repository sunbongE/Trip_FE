<script setup>
import { onMounted, ref, computed } from "vue";

import { searchClubAll } from "@/api/club";

const clubList = ref([]);

onMounted(() => {
  searchClubAll(
    ({ data }) => {
      console.log("club list 받아오기 : ", data);
      clubList.value = data;
    },
    (error) => console.log(object)
  );
});
</script>

<template>
  <div class="club-list-container">
    <div class="club-list-headline">
      <h1>동행</h1>
    </div>
    <div class="club-list-subline">
      <h4>같이 여행 갈 친구들을 찾아보세요 !</h4>
    </div>
    <div class="card-container">
      <div v-for="item in clubList" :key="item.id" class="card">
        <div class="card-body">
          <h3 class="card-title">{{ item.subject }}</h3>
          <div class="card-text">
            <span>작성자</span> <span>{{ item.userId }}</span>
          </div>
          <div class="card-text-content">
            <span>{{ item.content }}</span>
          </div>
          <div class="card-text">
            <span>등록일 </span> <span>{{ item.registerTime }}</span>
          </div>
          <div class="card-text">
            <span> 현재 인원</span> <span>{{ item.people }} / {{ item.totalCnt }}</span>
          </div>
          <button class="btn">
            <router-link :to="{ name: 'club-detail', params: { clubId: item.id } }">
              자세히
            </router-link>
          </button>
          <button @click="" class="btn">같이 갈래요 !</button>
        </div>
      </div>
    </div>
    <div class="button-pane">
      <button class="write-button">친구 구하러 가기</button>
    </div>
  </div>
</template>

<style scoped>
.club-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 70%; /* 원하는 최대 가로 크기 설정 */
}

.card {
  width: 300px; /* 각 카드의 너비 설정 */
  margin: 20px; /* 각 카드 사이의 간격 설정 */
  border-radius: 10px; /* 카드 테두리를 둥글게 만듦 */
  transition: filter 0.3s ease-in-out; /* 마우스 오버 시 흐려짐 효과 */
}

.card-body {
  padding: 20px; /* card-body 안의 내용과 카드 테두리 간의 간격 설정 */
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card-text {
  margin-bottom: 8px;
}
.card-text-content {
  margin-bottom: 8px;
  height: 100px;
  overflow: hidden;
}
.btn {
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid skyblue;
}
.btn:hover {
  filter: brightness(80%);
}
.button-pane {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* 버튼 위 여백 조절 */
}

.write-button {
  padding: 15px 30px; /* 버튼 내용에 대한 여백 설정 */
  font-size: 1.2rem; /* 버튼 글꼴 크기 설정 */
  background-color: skyblue; /* 버튼 배경색 설정 */
  color: #ffffff; /* 버튼 글꼴 색 설정 */
  border: none;
  border-radius: 8px; /* 버튼 테두리를 둥글게 만듦 */
  cursor: pointer;
  transition: background-color 0.3s ease; /* 마우스 오버 시 배경색 변화 효과 */
}

.write-button:hover {
  background-color: #2980b9;
}

a{
    text-decoration: none;
  color: black;
}
</style>
