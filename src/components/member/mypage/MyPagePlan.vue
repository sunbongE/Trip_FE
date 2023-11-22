<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { searchPlanByUserId, searchTourInfoByPlanId, deletePlanById } from "@/api/plan";
const router = useRouter();
const memberStore = useMemberStore();

const planList = ref([]);
const tourList = ref([]);
const searchPlanByUserIdFunc = () => {
  tourList.value = []
  planList.value = []
  searchPlanByUserId(
    memberStore.userInfo.userId,
    ({ data }) => {
      console.log(data)
      planList.value = data;
      planList.value.forEach((info) => {
        console.log("요청보냄")
        searchTourInfoByPlanId(info.id,
          ({ data }) => {
            console.log(data)
            data.forEach((dt) => {
              tourList.value.push(dt)
            })
          }
        )
      })

    },
    (error) => console.log(error)
  )
}
onMounted(async () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken && !memberStore.isLogin) {
    try {
      await memberStore.getUserInfo(accessToken);
    } catch (error) {
      console.error("Failed to fetch user information", error);
    }
  }
  searchPlanByUserIdFunc();
});

// 여기얌 준성쨩
const moveClub = (planId) => {
  console.log(planId)
  // router.push({ name: "club-write", params: planId })
}
const delFunc = (planId) => {
  deletePlanById(planId,
    (Response) => {
      searchPlanByUserIdFunc()
    })
}
</script>

<template>
  <div class="mypage-club">
    <h1>나의 계획</h1>
    <div id="cardFrame">
      <div class="planCard" v-for="item in planList" :key="item.id">
        <div>
          <h3>여행: {{ item.subject }} </h3>
          <p>설명: {{ item.description }}</p>
        </div>
        <div class="tourList">
          <template v-for="tour in tourList" :key="tour.plan_id">
            <template v-if="item.id === tour.plan_id">
              <p>
                {{ tour.content_order }}. {{ tour.title }}
              </p>
            </template>
          </template>
        </div>
        <div class="btns">
          <button id="clubBtn" @click="moveClub(item.id)">모집</button>
          <button id="delBtn" @click="delFunc(item.id)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import "@/assets/sass/member/myPagePlan.scss"
</style>
