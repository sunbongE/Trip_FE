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