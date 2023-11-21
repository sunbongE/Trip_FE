<script setup>
import { onMounted, ref } from "vue";
import { useRecoStore } from "@/stores/reco";
import RecoChoose from "@/components/reco/RecoChoose.vue";
import RecoDetail from "@/components/reco/RecoDetail.vue";

const recoStore = useRecoStore();
// 1. homeVIew 에서 recoList 가져오기
// 2. 바받은 6개 배열ㄹ을 recochoose에 넣어주기
// 3. 이후 recochoose 에서 선택될때마다 recodetail 에 넣어주기

onMounted(() => {
    // 페이지가 마운트되면 URL에서 searchData를 가져와 설정
    console.log("======== 도착 ========");
    console.log("Data", recoStore.searchLists);
});
const dto = ref([]);
const getShowDetailEvent = (data) => {
    console.log("RecoView get showDetailEvent : ", data);
    dto.value = data;
    console.log("DTO Copied : ", dto.value);
}
</script>
<template>
  <div>
    <!-- 화면이 넓을 때(데스크톱) -->
    <div class="reco-container">
      <div class="left-pane">
        <RecoChoose @show-detail="getShowDetailEvent"></RecoChoose>
      </div>
      <div class="right-pane">
        <RecoDetail :dto="dto"></RecoDetail>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reco-container {
  width: 95%;
  height: 100%;
  display: inline;
}

.left-pane {
  width: 49%;
  padding: 2%;
  float: inline-start;
  box-sizing: border-box;
}
.right-pane {
  width: 49%;
  padding: 2%;
  float: right;
  box-sizing: border-box;
}

@media screen and (max-width: 768px) {
  .left-pane {
    width: 49%;
    padding: 2%;
    float: inline-start;
    box-sizing: border-box;
  }
  .right-pane {
    width: 49%;
    padding: 2%;
    float: inline-block;
    box-sizing: border-box;
  }
}
</style>
