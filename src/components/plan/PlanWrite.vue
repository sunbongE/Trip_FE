<script setup>

</script>

<template>
   <section>

<article>
  <div>
    <h2 id="ment">여행계획 작성</h2>

  </div>
  <form id="articleForm" method="post">
    <input type="hidden" name="action" value="regist">
    <div id="formBox">
      <input type="hidden" id="userId" name="userId" readonly required="required"  />
  

      <label for="subject">여행 제목</label>
      <input type="text" id="subject" name="subject" autocomplete="off"  />
      <label for="content">질문 내용</label>
      <textarea id="content" name="content" cols="50" rows="20" required="required"
        ></textarea>


    </div>
    <div id="btnBox">
      <button type="button">닫기</button>
      <button type="button">작성하기</button>
    </div>
  </form>
</article>
</section>
</template>

<style scoped>
@import '@/assets/sass/plan/planWrite.scss';
</style>