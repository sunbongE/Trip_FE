<script setup>
import { useRouter } from 'vue-router';
import BoardListItem from './item/BoardListItem.vue';
import { listArticle } from "@/api/board";
import { onMounted, ref } from 'vue';

onMounted(() => {
  getArticleList();
});
const router = useRouter();

const articles = ref([])


const getArticleList = () => {
  // API 호출
  listArticle(
    ({ data }) => {
      articles.value = data;
    },
    (error) => console.log(error)
  );
};
const moveWrite = () => {
  router.push({ name: 'article-write' })
}

</script>
<template>
  <section>
    <!-- 게시글 작성 -->
    <article>
      <div id="ment">
        <h2>여행 정보를 공유해볼까요?</h2>
      </div>
      <div id="subment">
        <h2>프로 여행러들이 알려주는 여행 꿀팁을 확인하고</h2>
        <h2>나만의 꿀팁을 공유해보세요.</h2>
      </div>
      <div id="btnBox">
        <button id="goCreate" @click='moveWrite'>작성하기</button>
      </div>
    </article>
    <!-- 게시판 -->
    <article>
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">조회수</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          <!-- BE연결되면 Axios로 데이터 받아서 여기로 for문 돌려줌
                                                                                 -->
          <BoardListItem v-for="article in articles" :key="article.articleNo" :article="article"></BoardListItem>

        </tbody>
      </table>

    </article>
  </section>
</template>

<style scoped>
section {
  padding-top: 50px;
  width: 100%;
}

table {
  width: 80% !important;
  max-width: 1200px;
}

article {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

section article:nth-child(2) {
  background: #f9fbfc;
  padding-top: 50px;
  padding-bottom: 50px;
}

#btnBox {
  /* display: none; */
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  animation: fadein 3s;
}

#btnBox button {
  color: #fff;
  font-weight: bold;
  width: 140px;
  height: 50px;
  border-radius: 10px;
  background: #772cf0;
  border: none;
  font-size: 1.2em;
}

#btnBox button:hover {
  cursor: pointer;
}

#ment,
#subment {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  animation: fadein 3s;
}

#ment h2 {
  font-size: 3em;
  font-weight: 700;
}

#subment h2 {
  font-size: 1.6em;
  font-weight: 600;
  color: #8b95a1;
}
</style>