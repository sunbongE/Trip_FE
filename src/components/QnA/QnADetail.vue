<script setup>
import { useRouter, useRoute } from 'vue-router';
import { getModifyQna, deleteQna } from '@/api/qna'
import { listAns } from '@/api/qnaAns'
import { ref, onMounted } from 'vue';
import QnaAnswer from './item/QnaAnswer.vue';
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
</script>

<template>
  <section>
    <article>
      <div id="mentBox">
        <p id="ment">QnA 제목: {{ qna.subject }}</p>
        <div id="btnBox">
          <button type="button" @click='moveList'>목록</button>
          <button type="button" @click="moveQna">수정</button>
          <button type="button" @click="delFunc">삭제</button>
        </div>
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
        <div id="commentBox">
          <QnaAnswer v-for="ans in ansList" :key="ans.id" :ans="ans"></QnaAnswer>
        </div>
      </div>

    </article>


  </section>
</template>

<style scoped>
#commentBox {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

#commentFrame {
  border: 1px solid #6f6f6fbd;
  border-radius: 20px;
  max-width: 600px;
}

#cnt {
  margin-left: auto;
  font-size: 1.2em;
  font-weight: 600;
  margin-top: 10px;
  color: #8b95a1;
}


article>div>div {
  display: flex;
}

section {
  padding-top: 50px;
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
  /* margin-bottom: 50px; */
  display: flex;
  justify-content: end;
}

#btnBox button {
  margin: 0 10px;
  width: 60px;
  height: 30px;
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

#btnBox button:nth-child(3) {
  color: #fff;
  background: rgb(242, 53, 53);
  border: 1px solid rgb(242, 53, 53);
}
</style>