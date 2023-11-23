<script setup>
import { onMounted, ref } from 'vue';
const lgnUser = ref("");
onMounted(() => {
  if (sessionStorage.getItem("memberStore") !== null && JSON.parse(sessionStorage.getItem("memberStore")).isLogin) {
    lgnUser.value = JSON.parse(sessionStorage.getItem("memberStore")).userInfo.userId

  }
  
})
defineProps({
  qna: Object,
  isAdmin:Number
})

// console.log(qna)
</script>

<template >
  <tr>
    <td>{{ qna.open === true ? '비밀글' : '공개글' }}</td>
    <td v-if='qna.open !== true'>
      <router-link :to="{ name: 'QnA-view', params: { QnAno: qna.id } }">
        {{ qna.subject }}
      </router-link>
    </td>
    
    <td v-else class='sct'>
      <template v-if='isAdmin==2 || qna.userId === lgnUser '>
        <router-link :to="{ name: 'QnA-view', params: { QnAno: qna.id } }">
        {{ qna.subject }}
      </router-link>
      </template>
      <template v-else>
        {{ qna.subject }}
      </template>
    </td>

    <td>{{ qna.userId }}</td>
    <td>{{ qna.registerTime }}</td>
  </tr>
</template>  

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.sct{
  color: #949393;
}
</style>