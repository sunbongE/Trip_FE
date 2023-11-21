<script setup>
import { onMounted, ref } from "vue";
import { useRecoStore } from "@/stores/reco";

const recoStore = useRecoStore();

const emit = defineEmits(["showDetail"]);
const selectedItemId = ref(null);

const selectItem = (itemId) => {
  selectedItemId.value = itemId;
};
// choose, 해당 div 클릭 시 이벤트 발생
// 부모로 emit
// 부모는 emit 받은 dto를 detail에게 prop
const showDetailEvent = (i) => {
  console.log("call showDetailEvent()");
  console.log("DTO : ", i);
  emit("showDetail", i);
};
</script>

<template>
  <div class="reco-choose-container">
    <div
      v-for="item in recoStore.searchLists"
      :key="item.contentId"
      :class="{ 'reco-choose-pane': true, 'active': selectedItemId === item.contentId }"
      @click="selectItem(item.contentId); showDetailEvent(item)"
    >
      <div class="reco-item">
        <!-- 이미지 표시 -->
        <img
          v-if="item.firstImage || item.firstImage2"
          :src="item.firstImage || item.firstImage2"
          alt="https://ibb.co/mbNPfD4"
          class="reco-image"
        />
        <img
          v-else
          src="https://i.ibb.co/HgKFDHT/image-ready.png"
          alt=""
          class="reco-image"
        />
        <!-- 제목 -->
        <div class="reco-title">
          {{ item.title }}
        </div>
        <!-- 주소 -->
        <div class="reco-address">
          {{ item.addr1 || item.addr2 }}
        </div>

        <!-- 전화번호 -->
        <div class="reco-tel">
          {{ item.tel }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reco-choose-container {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  text-align: center;
}

.reco-choose-pane {
  width: 50%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  background-color: rgb(217, 235, 241);
}
.reco-choose-pane:hover {
  filter: brightness(75%);
}
.reco-choose-pane.active {
  border: 2px solid blue;
}
.reco-image {
  max-width: 100%;
  max-height: 200px;
  width: auto;
  height: auto;
}

.reco-title {
  font-weight: bold;
  font-size: 20px;
}
</style>
