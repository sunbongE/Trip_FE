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
      <h2>같이 여행 갈 친구들을 찾아보세요 !</h2>
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
          <div style='float : right'>
            <button class="btn">
                <router-link :to="{ name: 'club-detail', params: { clubId: item.id } }">
                자세히
                </router-link>
                </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1,h2{
  color: #fff !important;
}
.club-list-container {
  padding-top: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.club-list-headline {
  margin-bottom: 20px; /* 간격 늘리기 */
}

.club-list-subline {
  margin-bottom: 20px; /* 간격 늘리기 */
}

.club-list-subline h2 {
  font-size: 45px;
  color: #555;
}


.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 70%;
}

.card {
  width: 300px;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-body {
  padding: 20px;
  background-color: #ecf0f1;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #3498db;
}

.card-text {
  margin-bottom: 8px;
  color: #555;
}

.card-text-content {
  margin-bottom: 8px;
  height: 100px;
  overflow: hidden;
  color: #555;
}

.btn {
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #3498db;
  transition: filter 0.3s ease-in-out, color 0.3s ease;
}

.btn:hover {
  filter: brightness(80%);
  color: #2980b9;
}

.button-pane {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.write-button {
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.write-button:hover {
  background-color: #2980b9;
}

a {
  text-decoration: none;
  color: #555;
  transition: color 0.3s ease;
}

a:hover {
  color: #3498db;
}

h1 {
  font-weight: bold;
  font-size: 60px;
}
</style>
