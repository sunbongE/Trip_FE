import { onMounted, ref } from "vue";
import { defineStore } from "pinia";

export const useRecoStore = defineStore("reco", () => {
    const searchLists = ref([]);

    return {
        searchLists,
    }
})