import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTourPlanStore = defineStore("tourPlanStore", () => {
    // 개수
    // const planListCnt = ref(0);
    // 여행지 목록
    const planList = ref([])

    const planListCnt = computed(() => {
        return planList.value.length;
    });

    const selecList = ref([])

    const infos = ref([])

    return {
        planListCnt,
        planList,
        selecList,
        infos
    };
},
    { persist: { storage: sessionStorage } }
);