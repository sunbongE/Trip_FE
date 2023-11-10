<script setup>
defineProps({
  article: Object,
})

const moveDetail = (articleNo) => {
  console.log(articleNo)

}
</script>

<template>
  <tr>
    <td>{{ article.hit }}</td>
    <td>
      <router-link :to="{ name: 'article-view', params: { articleno: article.articleNo } }">
        {{ article.subject }}
      </router-link>
    </td>
    <td>{{ article.userId }}</td>
    <td>{{ article.registerTime }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
  color: black;

}
</style>