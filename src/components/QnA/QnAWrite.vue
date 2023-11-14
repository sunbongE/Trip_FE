<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { registQna } from '@/api/qna'
const router = useRouter();
const moveQnaList = () => {
  router.push({ name: 'Qna' })
}
const Qna = ref(
  {
    userId: "admin", // 임시값
    subject: "",
    content: "",
    open: false
  }
)
const writeQnaFunc = () => {
  if (subject.value.trim() === '') {
    subject.value = ''
    alert('제목을 입력해주세요.');
    return;
  } else if (content.value.trim() === '') {
    content.value = ''
    alert('내용을 입력해주세요.');
    return;
  }
  registQna(
    Qna.value,
    (response) => {
      console.log(response)
      alert("문의 감사합니다!")
      router.push({ name: "QnA-list" })

    },
    (error) => {
      console.log(error)
      Qna.value.content = '';
      Qna.value.subject = '';
      alert("작성 내용에 부적절한 단어를 포함해서는 안됩니다.")
    })
}
</script>

<template>
  <section>

    <article>
      <div>
        <h2 id="ment">QnA 작성하기</h2>

      </div>
      <form id="articleForm" method="post">
        <input type="hidden" name="action" value="regist">
        <div id="formBox">
          <input type="hidden" id="userId" name="userId" readonly required="required" :value="Qna.userId" />
          <div id="checkframe">
            <label for="open">비밀글</label>
            <input type="checkbox" name="open" id="open" v-model="Qna.open">
          </div>

          <label for="subject">질문</label>
          <input type="text" id="subject" name="subject" autocomplete="off" v-model.lazy="Qna.subject" />
          <label for="content">질문 내용</label>
          <textarea id="content" name="content" cols="50" rows="20" required="required"
            v-model.lazy="Qna.content"></textarea>


        </div>
        <div id="btnBox">
          <button type="button" @click='moveQnaList'>닫기</button>
          <button type="button" @click="writeQnaFunc">작성하기</button>
        </div>
      </form>
    </article>
  </section>
</template>

<style scoped>
@import '@/assets/sass/qna/QnAForm.scss';
</style>