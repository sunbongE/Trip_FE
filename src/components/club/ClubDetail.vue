<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { findClubById, searchClubMemberByClubId } from "@/api/club";
import { searchPlanById } from "@/api/plan";

const route = useRoute();
const clubId = ref(0);
const club = ref([]);
const clubMember = ref([]);
const plan = ref([]);
onMounted(async () => {
    clubId.value = route.params.clubId;
    // 개인 clubbyid 로 dto 가져오고
    //clubmember들도 가져오기
    // findclubbyid 로 가져온 dto 안에 planId로 , plan 의 정보까지 가져오기
    console.log("들어온 CLUB ID : ", clubId.value)
    findClubById(
        clubId.value,
        ({ data }) => {
            club.value = data;
            console.log("CLUB VALUE : ", club.value);
            plan.value = searchPlanById(
                club.value.planId,
                ({ data }) => {
                    
                }
            )
        },
        (error) => console.log(error)
    )
    searchClubMemberByClubId(
        clubId.value,
        ({ data }) => {
            clubMember.value = data;
            console.log("CLUBMEMBE VALUE ", clubMember.value);
        },
        error => console.log(error)
    )
})
</script>

<template>
    <div>
        
    </div>
</template>

<style scoped>

</style>