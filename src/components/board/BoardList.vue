<script setup>
import { useRouter } from 'vue-router';
import BoardListItem from './item/BoardListItem.vue';
import { listArticle } from "@/api/board";
import { onMounted, ref } from 'vue';
import VPageNavigation from "@/components/common/VPageNavigation.vue";
onMounted(() => {
  getArticleList();
});
const router = useRouter();

const articles = ref([])
const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});

const getArticleList = () => {
  // console.log("서버에서 글목록 얻어오자!!!", param.value);
  // API 호출
  listArticle(
    param.value,
    ({ data }) => {
      // console.log('come>>??')
      articles.value = data.articles;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
    },
    (error) => console.log(error)
  );
};
const onPageChange = (val) => {
  // console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  getArticleList();
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
        <button class="okBtn" @click='moveWrite'>작성하기</button>
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
      <VPageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></VPageNavigation>
    </article>
  </section>
</template>

<style scoped>
@import "@/assets/sass/board/BoardList.scss";
</style>