<script setup>
import PlanWrite from "../components/plan/PlanWrite.vue"
import { useTourPlanStore } from "@/stores/tourPlan.js"
import { storeToRefs } from 'pinia';
import { write } from "@/api/plan.js"

import { useRouter } from "vue-router"

const router = useRouter();
const tourPlanStore = useTourPlanStore();
const { selecList, planList, infos } = storeToRefs(tourPlanStore);


const userId = JSON.parse(sessionStorage.getItem("memberStore")).userInfo.userId
const makeInfosData = () => {
    infos.value = []

    for (let idx = 0; idx < selecList.value.length; idx++) {
        const info = {
            "contentId": selecList.value[idx],
            "contentOrder": idx + 1
        };
        infos.value.push(info)
    }
}
const writeFunc = async (info) => {
    await makeInfosData();
    const data = {
        "userId": userId,
        "subject": info.subject,
        "description": info.description,
        "infos": infos.value
    }
    // api에 데이터 요청보냄
    write(data,
        (Response) => {
            if (Response.status === 201) {
                planList.value = [];
                if (confirm("나의 여행 계획을 확인하시겠어요?")) {
                    router.push({ name: "mypage-plan" })
                } else {
                    router.push({ name: "home" });
                }
            } else {
                alert("예기치 못한 문제가 발생하였습니다. 다음에 시도해주세요.")
            }
        },
        (error) => {
            alert("예기치 못한 문제가 발생하였습니다. 다음에 시도해주세요.")
            console.log(error)
        })
    // 끝난 후 
}
const addOrDelFunc = (info) => {

    info.selected = !info.selected
    if (info.selected) { // 선택된상황
        selecList.value.push(info.contentId)
    } else {
        let idx = selecList.value.indexOf(info.contentId)
        selecList.value.splice(idx, 1)
    }
}
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
                                <img v-if="info.firstImage === ''" src="../assets/images/empty.png" alt="">
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
                            <div class='Btns'>
                                    <button v-if='info.selected' class='removeBtn' @click='addOrDelFunc(info)'>삭제</button>
                                    <button v-else class='addBtn' @click='addOrDelFunc(info)'>추가</button>
                                </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <PlanWrite @writeE='writeFunc'></PlanWrite>
    </div>
</template>

<style scoped>
@import '@/assets/sass/plan/plan.scss';
</style>