<script setup>

const props = defineProps({ dto: Array });

//props.dto
// props 에 있는 위도, 경도를 기준으로 다시 부가정보를 얻어오는 api를 구현 후 적용해준다.
</script>

<template>
  <div class="container">
    <div class="div1">
      <div v-if="props.dto.firstImage || props.dto.firstImage2" class="image-container">
        <img :src="props.dto.firstImage || props.dto.firstImage2" alt="Image" class="image" />
      </div>
      <div v-else class="image-container">
        <img src="https://i.ibb.co/HgKFDHT/image-ready.png" alt="Image" class="image" />
      </div>
      
      <div class="info-container">
        <h2 class="title">{{ props.dto.title }}</h2>
        <p class="address">{{ props.dto.addr1 }}</p>
        <p class="tel">{{ props.dto.tel }}</p>
      </div>
    </div>

    <div class="div2">
      <div class="sub-container">
        <h3 class="title">주변 숙박업소</h3>
      </div>

      <div class="sub-container">
        <h3 class="title">주변 식당</h3>
        <!-- 내용 추가 -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.div1 {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #87ceeb; /* 하늘색 */
}

.image-container {
  max-width: 50%;
}

.image {
  width: 100%;
  height: 200px;
}

.info-container {
  text-align: center;
}

.title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.div2 {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f0f0f0;
}

.sub-container {
  width: 100%;
}

.sub-title {
  font-size: 1.2em;
  margin-bottom: 10px;
}
</style>