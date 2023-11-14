<script setup>
import { useRouter } from 'vue-router';
import QnAListItem from './item/QnAListItem.vue';
import { listQna } from '@/api/qna';
import { onMounted, ref } from 'vue';
const router = useRouter();

const QnaList = ref([]);

const moveQnaWrite = () => {
  router.push({ name: 'QnA-write' })
}
onMounted(() => {
  getList();
});
const getList = () => {
  listQna(
    ({ data }) => {
      QnaList.value = data;
      console.log(QnaList.value)
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
          <h2>QnA 목록입니다.</h2>
        </div>
        <div id="subment">
          <h2>질문이 있거나 문의사항 있으면 </h2>
          <h2>글 남겨주세요.</h2>
        </div>
        <div id="btnBox">
          <button id="goCreate" @click='moveQnaWrite'>문의하기</button>
        </div>
      </article>
      <!-- 게시판 -->
      <article>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">공개여부</th>
              <th scope="col">작성자</th>
              <th scope="col">질문</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            <!-- BE연결되면 Axios로 데이터 받아서 여기로 for문 돌려줌
                                                                           -->
            <QnAListItem v-for=" qna in QnaList " :key="qna.id" :qna="qna"></QnAListItem>

          </tbody>
        </table>

      </article>
    </section>
  </div>
</template>

<style scoped>
@import "@/assets/sass/board/BoardList.scss";
</style>