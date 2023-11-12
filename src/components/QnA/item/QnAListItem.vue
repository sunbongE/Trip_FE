<script setup>
defineProps({
  qna: Object,
})

</script>

<template>
  <tr>
    <td>{{ qna.open === true ? '비밀글' : '공개글' }}</td>
    <td>
      <router-link :to="{ name: 'QnA-view', params: { QnAno: qna.id } }">
        {{ qna.subject }}
      </router-link>
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
</style>