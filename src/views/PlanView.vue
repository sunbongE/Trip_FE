<script setup>
import PlanWrite from "../components/plan/PlanWrite.vue"
import { useTourPlanStore } from "@/stores/tourPlan.js"
import { storeToRefs } from 'pinia';
const tourPlanStore = useTourPlanStore();
const { planListCnt, planList } = storeToRefs(tourPlanStore);

</script>

<template>
    <div id='planFrame'>
        <h2>여행지 목록</h2>
        <hr>
        <div id='tourList'>
            <template v-for='info in planList'>
                <div class="showPlanFrame">
                    <div id="myList">
                    <div id="myListFrame">
                        <div class="Images">
                            <img v-if="info.firstImage==='' " src="../assets/images/empty.png" alt="">
                            <img v-else :src="info.firstImage" alt="" srcset="">
                        </div>
                        <div class="info">
                            <div class="infoTitle">
                                <span>여행지 : {{ info.title }}</span>
                            </div>
                            <div>
                                <p>주소: {{ info.addr }}</p>
                                <p>전화번호: {{ info.tel }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        </div>
        <PlanWrite></PlanWrite>
    </div>
</template>

<style scoped>
@import '@/assets/sass/plan/plan.scss';
</style>