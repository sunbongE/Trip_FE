import { onMounted, ref } from "vue";
import { defineStore } from "pinia";

export const useClubStore = defineStore("club", () => {
    const myClubs = ref([]);

    const toMeList = ref([]);

    const fromMeList = ref([]);

    return {
        myClubs,
        toMeList,
        fromMeList,
    }
})