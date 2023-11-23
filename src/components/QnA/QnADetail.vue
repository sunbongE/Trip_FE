<script setup>
import { useRouter, useRoute } from 'vue-router';
import { getModifyQna, deleteQna } from '@/api/qna'
import { listAns } from '@/api/qnaAns'
import { ref, onMounted } from 'vue';
import QnaAnswer from './item/QnaAnswer.vue';
import QnAFormItem from './item/QnAFormItem.vue';
const router = useRouter();
const route = useRoute();
const QnAno = route.params.QnAno
const qna = ref({})
const lgnUserId = ref('')

onMounted(() => {
  if (sessionStorage.getItem('memberStore') != null
    && JSON.parse(sessionStorage.getItem('memberStore')).isLogin) {
      lgnUserId.value=JSON.parse(sessionStorage.getItem('memberStore')).userInfo.userId
    }
  getModifyQna(
    QnAno,
    ({ data }) => {
      qna.value = data
      // console.log(qna.value)
    },
    (error) => console.error()
  );
  getAns();
})

const moveList = () => {
  router.push({ name: 'QnA-list' })
}

const moveQna = () => {
  router.push({ name: "QnA-modify" })
}

const delFunc = () => {
  deleteQna(
    QnAno,
    (Response) => {
      if (Response.status === 204) {
        alert("삭제되었습니다.")
      }
      router.push({ name: "QnA-list" })
    },
    (error) => {
      alert("이미 삭제된 글입니다.")
      router.push({ name: "QnA-list" })
    }
  )
}
/// 댓극 가져오기...
const ansList = ref([]);
const getAns = () => {
  listAns(
    QnAno,
    ({ data }) => {
      ansList.value = data;
    },
    (error) => console.log(error)
  )
};
const changeFunc=() => {
  ansList.value = [];
  getAns()
}
</script>

<template>
  <section>
    <article>
      <div id="mentBox">
        <div id="btnBox">
          <button type="button" @click='moveList'>목록</button>
          <template v-if='lgnUserId === qna.userId'>
            <button type="button" class='okBtn' @click="moveQna">수정</button>
            <button type="button" class='cancelBtn' @click="delFunc">삭제</button>
          </template>
        </div>
        <p id="ment">QnA 제목: {{ qna.subject }}</p>
      </div>
      <form id="articleForm">
        <div id="formBox">
          <label for="userId">작성자 ID</label>
          <input type="text" id="userId" name="userId" disabled required="required" :value="qna.userId">

          <label for="content">내용</label>
          <textarea id="content" name="content" cols="20" rows="10" required="required"
            readonly>{{ qna.content }}</textarea>

        </div>

      </form>
      <hr>
      <div id="commentFrame">
        <QnAFormItem :qnaId='qna.id' @change-list='changeFunc'></QnAFormItem>
        <div id="commentBox">
          <QnaAnswer v-for="ans in ansList" :key="ans.id" :ans="ans" @del-f='changeFunc'></QnaAnswer>
        </div>
      </div>

    </article>


  </section>
</template>

<style scoped>
@import '@/assets/sass/qna/QnAForm.scss';
</style>