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
section {
  padding-top: 220px;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}

article {
  width: 100%;
  animation: fadein 3s;
}

#ment {
  font-size: 2.6em;
  font-weight: 700;
}

#subment {
  font-size: 1.2em;
  font-weight: 600;
  margin-top: 10px;
  color: #8b95a1;
}

#formBox {
  width: 100%;
  padding: 50px 0;
}

#articleForm {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

#articleForm label {
  color: #6f6f6f;
}

#articleFrom input:nth-child(1) {
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  background: #f2f2f2;
}

#articleForm input {
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  padding: 10px;
}

#articleForm textarea {
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  width: 100%;
  border-radius: 6px;
  padding: 10px;
  resize: none;
}

#articleForm label {
  margin: 20px 0 5px 0;
}

#btnBox {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
}

#btnBox button {
  margin: 0 10px;
  width: 120px;
  height: 50px;
  border-radius: 6px;
  background: #f7f8fa;
  border: 1px solid #d9d9d9;
  font-size: 1.1em;
}

#btnBox button:hover {
  cursor: pointer;
}

#btnBox button:nth-child(2) {
  color: #fff;
  background: #772cf0;
  border: 1px solid #772cf0;
}
</style>