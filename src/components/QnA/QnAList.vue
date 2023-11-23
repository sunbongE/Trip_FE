<script setup>
import { useRouter } from 'vue-router';
import QnAListItem from './item/QnAListItem.vue';
import { listQna } from '@/api/qna';
import { onMounted, ref } from 'vue';
import VPageNavigation from "@/components/common/VPageNavigation.vue";

const router = useRouter();

const QnaList = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});
const isAdmin = ref("")
const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  getList();
};

const moveQnaWrite = () => {
  router.push({ name: 'QnA-write' })
}
onMounted(() => {
  getList();
  if (sessionStorage.getItem("memberStore") !== null && JSON.parse(sessionStorage.getItem("memberStore")).isLogin) {

    isAdmin.value = JSON.parse(sessionStorage.getItem("memberStore")).userInfo.gradeId
  }

});
const getList = () => {
  listQna(
    param.value,
    ({ data }) => {
      // console.log(data)
      QnaList.value = data.qnalist;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
    },
    (error) => console.log(error)
  )
}

</script>
<template>
  <div>
    <section>
      <!-- 게시글 작성 -->
      <article>
        <div id="ment">
          <h2>QnA 목록</h2>
        </div>
        <div id="subment">
          <h2>질문이 있거나 문의사항 있으면 </h2>
          <h2>글 남겨주세요.</h2>
        </div>
        <div id="btnBox">
          <button class='okBtn' @click='moveQnaWrite'>문의하기</button>
        </div>
      </article>
      <!-- 게시판 -->
      <article>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">공개여부</th>
              <th scope="col">질문</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            <!-- BE연결되면 Axios로 데이터 받아서 여기로 for문 돌려줌 -->

            <QnAListItem v-for=" qna in QnaList " :key="qna.id" :qna="qna" :isAdmin='isAdmin'></QnAListItem>

          </tbody>
        </table>
        <VPageNavigation :current-page="currentPage" :total-page="totalPage" @pageChange="onPageChange"></VPageNavigation>
      </article>
    </section>
  </div>
</template>

<style scoped>
@import "@/assets/sass/board/BoardList.scss";
</style>