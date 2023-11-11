<script setup>
import { detailArticle, modifyArticle, deleteArticle } from "@/api/board";
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from "vue";
const route = useRoute();
const router = useRouter();
const articleNo = ref(route.params.articleno);
const article = ref({
  articleNo: 0,
  content: "",
  subject: "",
  userId: ""
})
onMounted(() => {
  detailArticle(
    articleNo.value,
    ({ data }) => {
      article.value.articleNo = data.articleNo;
      article.value.content = data.content;
      article.value.subject = data.subject;
      article.value.userId = data.userId;
    },
    (error) => console.log(error)
  )
})

const modifyBtn = () => {

  if (article.value.subject.trim() === '') {
    alert('제목을 입력해주세요.');
    return;
  } else if (article.value.content.trim() === '') {
    alert('내용을 입력해주세요.');
    return;
  }

  modifyArticle(
    article.value,
    (response) => {
      if (response.status === 200) {
        alert("글이 수정되었습니다.")
      } else (
        alert("글을 수정할 수 없습니다.")
      )
      router.push({ name: "article-list" })
    },
    (error) => console.log(error)
  )

  // axios요청
}
const deleteBtn = () => {
  console.log(article.value)
  deleteArticle(
    article.value.articleNo,
    (response) => {
      if (response.status === 204) {
        alert('삭제되었습니다.')
      } else {
        alert('삭제할 수 없습니다.')
      }
      router.push({ name: 'article-list' })
    },
    (error) => {
      console.log(error)
    }
  )

}

</script>

<template>
  <section>
    <article>
      <div>
        <h2 id="ment">여행정보 글 수정하기</h2>
        <h2 id="subment">내가 작성한 글을 수정할 수 있어요.</h2>
      </div>
      <form id="articleForm">
        <input type="hidden" name="articleNo" :value="article.articleNo">
        <div id="formBox">
          <input type="hidden" :value="article.userId" />

          <label for="subject">제목</label>
          <input type="text" autocomplete="off" v-model="article.subject" />

          <label for="content">내용</label>
          <textarea cols="50" rows="20" required="required" v-model="article.content"> </textarea>
        </div>
        <div id="btnBox">
          <button type="button" id="modify-btn" @click="modifyBtn">수정하기</button>
          <button type="button" id="delete-btn" @click="deleteBtn">삭제하기</button>
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