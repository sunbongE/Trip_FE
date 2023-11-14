<script setup>
import { useRouter, useRoute } from 'vue-router';
import { getModifyQna, modifyQna } from '@/api/qna'
import { ref, onMounted } from 'vue';

const moveList = () => {
  router.push({ name: 'QnA-list' })
}
const router = useRouter();
const route = useRoute();
const QnAno = route.params.QnAno
const qna = ref({})
onMounted(() => {
  getModifyQna(
    QnAno,
    ({ data }) => {
      qna.value = data
      console.log(qna.value)

    },
    (error) => console.error()
  )
})
const modifyBtn = () => {
  if (qna.value.subject.trim() === '') {
    subject.value = ''
    alert('제목을 입력해주세요.');
    return;
  } else if (qna.value.content.trim() === '') {
    content.value = ''
    alert('내용을 입력해주세요.');
    return;
  }
  modifyQna(
    qna.value,
    (Response) => {
      if (Response.status === 200) {
        alert('수정되었습니다.')
        moveList();
      } else {
        qna.value.content = '';
        qna.value.subject = '';
        alert("작성 내용에 부적절한 단어를 포함해서는 안됩니다.")

      }

    },
    (error) => console.log(error)
  )
}
</script>

<template>
  <section>
    <article>
      <div>
        <h2 id="ment">QnA글 수정</h2>

      </div>
      <form id="articleForm">
        <div id="formBox">
          <input type="hidden" id="userId" name="userId" disabled required="required" :value="qna.userId">
          <label for="subject">질문</label>
          <input type="text" id="subject" v-model.lazy="qna.subject">

          <label for="content">질문 내용</label>
          <textarea id="content" name="content" cols="50" rows="20" v-model.lazy="qna.content"></textarea>
        </div>

        <div id="btnBox">
          <button type="button" @click.prevent='moveList'>목록으로</button>
          <button type="button" @click.prevent="modifyBtn">수정하기</button>
        </div>
      </form>
    </article>

  </section>
</template>


<style scoped>
@import '@/assets/sass/qna/QnAForm.scss';
</style>