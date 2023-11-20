<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { registArticle } from "@/api/board";
onMounted(() => {
  boardDto.value.userId = JSON.parse(sessionStorage.getItem("memberStore")).userInfo.userId

})

const router = useRouter();
const moveList = () => {
  router.push({ name: 'article-list' })
}



const onFileChange = (event) => {
  const files = event.target.files;
  // Handle multiple files
  upfile.value = files;
}

let formData = new FormData();

const updateFormData = () => {
  // formdata.append('boardDto', boardDto.value);
  // formData.append('boardDto', JSON.stringify(boardDto.value));
  let boardJson = JSON.stringify({
    userId: boardDto.value.userId,
    subject: boardDto.value.subject,
    content: boardDto.value.content,
    category: boardDto.value.category,
    content_id: boardDto.value.content_id
  })
  let board = new Blob([boardJson], { type: 'application/json' })
  formData.append("boardDto", board)
  // Handle multiple files
  for (let i = 0; i < upfile.value.length; i++) {
    formData.append('upfile', upfile.value[i]);
  }

};


const boardDto = ref(
  {
    userId: "",
    subject: "",
    content: "",
    category: 1,
    content_id: 0
  }
)
const upfile = ref([])


const registFunc = async () => {
  if (boardDto.value.subject.trim() === '') {
    alert('제목을 입력해주세요.');
    return;
  } else if (boardDto.value.content.trim() === '') {
    alert('내용을 입력해주세요.');
    return;
  }
  // 값 할당
  boardDto.value.subject = boardDto.value.subject.trim()
  boardDto.value.content = boardDto.value.content.trim()

  await updateFormData()
  console.log(formData.getAll('boardDto'))

  registArticle(formData,
    (response) => {
      if (response.status === 201) {
        router.push({ name: "article-list" })
      } else { // 비속어 감지.
        boardDto.value.subject = '';
        boardDto.value.content = '';
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
      <form id="articleForm" @submit.prevent='registFunc' enctype="multipart/form-data">
        <div id="formBox">
          <input type="hidden" id="userId" name="userId" readonly required="required" :value="boardDto.userId" />

          <label for="subject">제목</label>
          <input type="text" id="subject" name="subject" autocomplete="off" v-model.lazy="boardDto.subject" />
          <label for="content">내용</label>
          <textarea id="content" name="content" cols="50" rows="20" required="required"
            v-model.lazy="boardDto.content"></textarea>
          <div>
            <label for="upfile">이미지:</label>
            <input type="file" id="upfile" name="upfile" accept="image/*" multiple="multiple" @change="onFileChange">

          </div>

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