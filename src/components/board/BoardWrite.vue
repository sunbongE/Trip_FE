<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registArticle } from "@/api/board";
const router = useRouter();
const moveList = () => {
  router.push({ name: 'article-list' })
}
const inSubject = ref("");
const inContent = ref("");
const article = ref(
  {
    userId: "admin",
    subject: "",
    content: ""
  }
)

const registFunc = () => {
  if (inSubject.value.trim() === '') {
    alert('제목을 입력해주세요.');
    return;
  } else if (inContent.value.trim() === '') {
    alert('내용을 입력해주세요.');
    return;
  }
  // 값 할당
  article.value.subject = inSubject.value.trim()
  article.value.content = inContent.value.trim()
  registArticle(article.value,
    (response) => {
      if (response.status === 201) {
        router.push({ name: "article-list" })
      } else {
        inSubject.value = '';
        inContent.value = '';
        alert("내용이 적절하지 않습니다. 다시 확인해주세요.")
      }
    },
    (error) => console.log(error))


}
</script>

<template>
  <section>

    <article>
      <div>
        <h2 id="ment">여행정보 글 작성하기</h2>
        <h2 id="subment">나만의 여행 꿀팁을 공유해보세요.</h2>
      </div>
      <form id="articleForm" method="">
        <div id="formBox">
          <input type="hidden" id="userId" name="userId" readonly required="required" :value="article.userId" />

          <label for="subject">제목</label>
          <input type="text" id="subject" name="subject" autocomplete="off" v-model.lazy="inSubject" />
          <label for="content">내용</label>
          <textarea id="content" name="content" cols="50" rows="20" required="required"
            v-model.lazy="inContent"></textarea>


        </div>
        <div id="btnBox">
          <button type="button" @click='moveList'>닫기</button>
          <button type="button" id="createBtn" @click="registFunc">작성하기</button>
        </div>
      </form>
    </article>
  </section>
</template>

<style scoped>

@import '@/assets/sass/board/BoardForm.scss'
</style>