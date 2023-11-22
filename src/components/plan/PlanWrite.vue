<script setup>
import { useTourPlanStore } from "@/stores/tourPlan.js"
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from "vue-router"

const emit = defineEmits(["writeE"])
const router = useRouter();


const info = ref({
  subject: "",
  description: ''
})
const closeFunc = () => {
  router.push("/tour/plan")
}
const writeFunc = () => {

  emit("writeE", info.value)
}

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
          <input type="hidden" id="userId" name="userId" readonly required="required" />


          <label for="subject">여행 제목</label>
          <input type="text" id="subject" name="subject" autocomplete="off" v-model='info.subject' />
          <label for="content">메모</label>
          <textarea id="content" name="content" cols="50" rows="5" required="required"
            v-model='info.description'></textarea>


        </div>
        <div id="btnBox">
          <button type="button" @click='closeFunc'>닫기</button>
          <button class='okBtn' type="button" @click='writeFunc'>작성하기</button>
        </div>
      </form>
    </article>
  </section>
</template>

<style scoped>
@import '@/assets/sass/plan/planWrite.scss';
</style>