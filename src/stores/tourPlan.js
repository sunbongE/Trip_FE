import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTourPlanStore = defineStore("tourPlanStore", () => {

    // 개수
    const planListCnt = ref(0);
    // 여행지 목록
    const planList = ref([])

    planListCnt.value = computed(() => {
        return planList.value.length;
    });


    return {
        planListCnt,
        planList,
    };
},
    { persist: { storage: sessionStorage } }
);