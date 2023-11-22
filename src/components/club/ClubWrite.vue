<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { registClub } from "@/api/club";

const memberStore = useMemberStore();
const loginUser = ref([]);

const route = useRoute();
const router = useRouter();

// const plan = ref([]);

const clubRegistDto = ref({
  userId: "", /*컷*/
  subject: "",/*컷*/
  planId: 0,
  content: "",/*컷*/
  totalCnt: 0,/*컷*/
  status: 1,
});
/* <router-link :to="{ name: 'club-detail', params: { clubId: item.id } }">
                자세히
                </router-link> */
onMounted(async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken && !memberStore.isLogin) {
        try {
            await memberStore.getUserInfo(accessToken);
        } catch (error) {
            console.error("Failed to fetch user information", error);
        }
    }

    /* dto 에 planid 담기 - route 에서 매개변수로 받아온거 넣어주기 */
    clubRegistDto.value.planId = route.params.planId;

    /* dto 에 userId 담기 */
    loginUser.value = memberStore.userInfo;
    clubRegistDto.value.userId = loginUser.value.userId;

    console.log("로그인 유저 : ", loginUser.value);
    console.log("DTO에 담긴 ID : ", clubRegistDto.value.userId);
});

function onSubmit() {
	// form 에 있는 걸로 regist 하러 슛
	callRegistClub();
}

function callRegistClub() {
    console.log("Club 생성 시도", clubRegistDto.value);

    // club api 에서 regist 호출 후 실행
    // 끝나고 list로 슛
    registClub(
        clubRegistDto.value,
        console.log("regist 종료"),
        error => console.log(error)
    )

    router.push("/club");
}


function goBack() {
  router.back();
}
</script>

<template>
  <section>
    <article>
      <div>
        <h2 id="ment">여행정보 글 작성하기</h2>
        <h2 id="subment">나만의 여행 꿀팁을 공유해보세요.</h2>
      </div>
      <form id="articleForm" @submit.prevent="onSubmit">
        <div id="formBox">

          <label for="subject">제목</label>
          <input
            type="text"
            id="subject"
            name="subject"
            autocomplete="off"
            v-model="clubRegistDto.subject"
          />
          <label for="content">내용</label>
          <textarea
            id="content"
            name="content"
            cols="50"
            rows="20"
            required="required"
            v-model="clubRegistDto.content"
          ></textarea>
          <label for="subject">최대 인원 수</label>
          <input
            type="number"
            id="totalCnt"
            name="totalCnt"
            autocomplete="off"
            v-model="clubRegistDto.totalCnt"
          />
        </div>
        <div id="btnBox">
          <button type="button" @click="goBack">취소</button>
          <button class="okBtn" type="submit">작성하기</button>
        </div>
      </form>
    </article>
  </section>
</template>

<style scoped>
@import "@/assets/sass/board/BoardForm.scss";
</style>
