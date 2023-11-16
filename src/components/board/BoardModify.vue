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
      <form id="articleForm" @submit.prevent=''>
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
@import '@/assets/sass/board/BoardForm.scss'
</style>