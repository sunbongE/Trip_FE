<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { detailArticle } from "@/api/board";

const router = useRouter();
const moveList = () => {
  router.push({ name: 'article-list', params: article.value.articleNo })
}
const files = ref([]);
const route = useRoute();
const articleNo = ref(0);
onMounted(() => {
  articleNo.value = route.params.articleno;
  getArticle(articleNo.value);
  // console.log(articleNo.value)
})
const article = ref({
  articleNo: 0,
  content: "",
  hit: 0,
  registerTime: "",
  subject: "",
  userId: ""
})
const getArticle = () => {
  detailArticle(
    articleNo.value,
    ({ data }) => {
      article.value.articleNo = data.articleNo;
      article.value.content = data.content;
      article.value.hit = data.hit;
      article.value.registerTime = data.registerTime;
      article.value.subject = data.subject;
      article.value.userId = data.userId;

      data.fileInfos.forEach(e => {
        let cur_src = "http://localhost/baroga/upload/" +
          e.saveFolder +
          "/" +
          e.saveFile;
        files.value.push(cur_src);
      });
      console.log("====>" + files.value)

      // files.value = data.fileInfos

      console.log(data)
      // fileInfoList(articleNo.value,
      //   ({data}) => {
      //     files.value = data
      //     console.log(files.value)
      // })

    },
    (error) => console.log(error)
  )
}

const moveModify = () => {
  router.push({ name: "article-modify" })
}
</script>

<template>
  <section>
    <article>
      <div id="mentBox">
        <p id="ment">{{ article.subject }}</p>
        <div>
          <span id="subment">작성자: {{ article.userId }}</span>
        </div>
        <div>
          <span id="subment">{{ article.registerTime }}</span><span id="cnt">조회수 : {{ article.hit }}</span>
        </div>
      </div>
      <form id="articleForm">
        <div id="formBox">
          <input type="hidden" id="userId" name="userId" disabled required="required" :value="article.userId">
          <div id='imgBox' v-if="files.length !== 0">
            <div v-for='cur in files' :key='cur.saveFile'>
              <img :src="cur" alt="" srcset="">
            </div>

          </div>
          <!-- {{ files }} -->
          <label for="content">내용</label>
          <textarea id="content" name="content" cols="50" rows="10" required="required"
            readonly>{{ article.content }}</textarea>

        </div>
        <div id="btnBox">
          <button type="button" @click='moveList'>목록으로</button>
          <button type="button" id="update-btn" @click="moveModify">수정하기</button>
        </div>
      </form>

    </article>


  </section>
</template>

<style scoped>
@import '@/assets/sass/board/BoardForm.scss'
</style>